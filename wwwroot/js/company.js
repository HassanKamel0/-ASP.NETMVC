var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url":"/Admin/Company/GetAll"
        },
        "columns": [
            {"data":"id","width":"2%"},
            {"data":"name","width":"10%"},
            {"data":"streetAddress","width":"25%"},
            {"data":"city","width":"10%"},
            {"data":"state","width":"10%"},
            {"data":"postalCode","width":"10%"},
            {"data":"phoneNumber","width":"14%"},
            {
                "data": "id",
                "render": function (data) {
                    return `
                            <div class="w-45 btn-group" role="group">
                            <a href="/Admin/Company/Upsert?id=${data}"
                            class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i> Edit</a>
                            </div>
                         
                            <div class="w-45 btn-group" role="group">
                            <a onClick=Delete('/Admin/Company/Delete/${data}')
                            class="btn btn-outline-danger"><i class="bi bi-trash"></i>&nbsp;Delete</a>
                            </div>
                        `
                },
                "width": "20%"
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