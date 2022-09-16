var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url":"/Admin/Product/GetAll"
        },
        "columns": [
            {"data":"id","width":"2%"},
            {"data":"title","width":"15%"},
            {"data":"isbn","width":"5%"},
            {"data":"price","width":"5%"},
            {"data":"price50","width":"5%"},
            {"data":"price100","width":"5%"},
            {"data":"author","width":"14%"},
            {"data":"category.name","width":"5%"},
            {"data":"coverType.name","width":"9%"},
            {
                "data": "id",
                "render": function (data) {
                    return `
                            <div class="w-45 btn-group" role="group">
                            <a href="/Admin/Product/Upsert?id=${data}"
                            class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i> Edit</a>
                            </div>
                         
                            <div class="w-45 btn-group" role="group">
                            <a onClick=Delete('/Admin/Product/Delete/${data}')
                            class="btn btn-outline-danger"><i class="bi bi-trash"></i>&nbsp;Delete</a>
                            </div>
                        `
                },
                "width": "15%"
            }
        ]
    });
}
function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    }
                    else { toastr.error(data.message)}
                  }
            })
        }
    })
}