$(document).ready(
    function refresh() {
        getSuplyers()
    }
)
function getSuplyers() {
    $.ajax({
        url: '/Suplyer/getSuplyers',
        data: {
            search: document.getElementById('txtSearch').value
        },
        type: "GET",
        success: function (data) {
            document.getElementById('dataSource').innerHTML = null

            let row = ''

            for (var i = 0; i < data.obj.length; i++) {
                row += `<tr class="tableRow"><td>${data.obj[i].id}</td>`
                row += `<td>${data.obj[i].name}</td>`
                row += `<td>${data.obj[i].email}</td>`
                row += `<td>${data.obj[i].phone}</td>`
                row += `<td class="actionColumn"><button class="btn" style="background-color: #fc8a04;" onclick="getSuplyerById('${data.obj[i].id}')"><i class="fa fa-pen" style="color: white"></i></button><button class="btn ml-1" style="background-color: #fc8a04;" onclick="deleteSuplyer('${data.obj[i].id}')"><i class="fa fa-trash" style="color: white"></i></button></td></tr>`
            }
            if (row == '') {
                row = '<tr><td colspan="4"><center><b>Nenhum Fornecedor Encontrado</b></center></td></tr>'
            }

            $('#dataSource').append(row)
        }
    })
}
function createSuplyer() {
    $.ajax({
        url: 'Suplyer/createSupyer',
        data: {
            name: document.getElementById('txtNomeFornecedor').value,
            email: document.getElementById('txtEmailFornecedor').value,
            phone: document.getElementById('txtTelefoneFornecedor').value,
            description: document.getElementById('txtDescricaoFornecedor').value
        },
        type: "POST",
        success: function (data) {
            if (data == "OK") {
                alert('FORNECEDOR CADASTRADO')
                document.getElementById('txtNomeFornecedor').value = "",
                    document.getElementById('txtEmailFornecedor').value = "",
                    document.getElementById('txtTelefoneFornecedor').value = "",
                    document.getElementById('txtDescricaoFornecedor').value = ""
                getSuplyers()
            } else {
                alert('ERROR')
            }
        }
    })
}

function deleteSuplyer(id) {
    $.ajax({
        url: 'Suplyer/deleteSuplyer',
        data: {
            id: id
        },
        type: "DELETE",
        success: function (data) {
            if (data == "OK") {
                alert('FORNECEDOR DELETADO')
                getSuplyers()
            }
            else {
                alert('Error')
            }
        }
    })
}

function getSuplyerById(id) {
    $.ajax({
        url: 'Suplyer/getSuplyerById',
        data: {
            id: id
        },
        type: "GET",
        success: function (data) {
            document.getElementById('txtNomeFornecedorEdit').value = data.name,
                document.getElementById('txtEmailFornecedorEdit').value = data.email,
                document.getElementById('txtTelefoneFornecedorEdit').value = data.phone,
                document.getElementById('txtDescricaoFornecedorEdit').value = data.description,
                document.getElementById('txtIdFornecedorEdit').value = data.id
            $('#modalEditaFornecedor').modal('show');
        }
    })
}

function editSuplyer() {
    $.ajax({
        url: 'Suplyer/editSuplyer',
        data: {
            id: document.getElementById('txtIdFornecedorEdit').value,
            newName: document.getElementById('txtNomeFornecedorEdit').value,
            newEmail: document.getElementById('txtEmailFornecedorEdit').value,
            newPhone: document.getElementById('txtTelefoneFornecedorEdit').value,
            newDescription: document.getElementById('txtDescricaoFornecedorEdit').value
        },
        type: "PUT",
        success: function (data) {
            if (data == "OK") {
                alert('Editado com sucesso!')
                $('#modalEditaFornecedor').modal('hide');
                getSuplyers()
            } else {
                alert('Erro ao editar fornecedor')
            }
        }
    })
}
