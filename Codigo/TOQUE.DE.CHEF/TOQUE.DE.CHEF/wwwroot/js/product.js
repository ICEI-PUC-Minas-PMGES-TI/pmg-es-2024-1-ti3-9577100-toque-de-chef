$(document).ready(function () {
    getProducts()
})

function getProducts() {
    $.ajax({
        url: '/Product/getAllProducts',
        data: {
            search: document.getElementById('txtSearch').value,
            page: page,
        },
        type: "GET",
        success: function (data) {
            document.getElementById('dataSource').innerHTML = null

            let row = ''

            for (var i = 0; i < data.obj.length; i++) {
                row += `<tr class="tableRow"><td>${data.obj[i].id}</td>`
                row += `<td>${data.obj[i].name}</td>`
                row += `<td>${data.obj[i].description}</td>`
                row += `<td class="actionColumn"><button class="btn" style="background-color: #fc8a04;" onclick="getProductById('${data.obj[i].id}')"><i class="fa fa-pen" style="color: white"></i></button><button class="btn ml-1" style="background-color: #fc8a04;" onclick="deleteProduct('${data.obj[i].id}')"><i class="fa fa-trash" style="color: white"></i></button></td></tr>`
            }

            if (row == '') {
                row = '<tr><td colspan="4"><center><b>Nenhum Produto Encontrado</b></center></td></tr>'
            }

            $('#dataSource').append(row)
            //document.getElementById('dataSource').innerHTML = row
        }
    })
}

function createProduct() {
    $.ajax({
        url: '/Product/addProduct',
        data: {
            name: document.getElementById('txtNomeProduto').value,
            description: document.getElementById('txtDescricaoProduto').value
        },
        type: "GET",
        success: function (data) {
            if (data == "OK") {
                alert('CADASTRADO')
                document.getElementById('txtNomeProduto').value = ""
                document.getElementById('txtDescricaoProduto').value = ""
                getProducts()
            } else {
                alert('ERRO')
            }
        }
    })
}

function deleteProduct(id) {
    $.ajax({
        url: '/Product/deleteProduct',
        data: {
            id: id
        },
        type: "DELETE",
        success: function (data) {
            if (data == "OK") {
                alert('PRODUTO DELETADO')
                getProducts()
            }
            else {
                alert('Erro')
            }
        }
    })
}

function getProductById(id) {
    $.ajax({
        url: '/Product/getProductById',
        data: {
            id: id
        },
        type: "GET",
        success: function (data) {

            document.getElementById('txtDescricaoProdutoEdit').value = data.description
            document.getElementById('txtIdProduto').value = data.id
            document.getElementById('txtNomeProdutoEdit').value = data.name
            $('#modalEditaProduto').modal('show');
        }
    })
}

function editProduct() {
    $.ajax({
        url: '/Product/editProduct',
        data: {
            id: document.getElementById('txtIdProduto').value,
            newName: document.getElementById('txtNomeProdutoEdit').value,
            newDescription: document.getElementById('txtDescricaoProdutoEdit').value
        },
        type: "PUT",
        success: function (data) {
            if (data == "OK") {
                alert('Editado com sucesso!')
                $('#modalEditaProduto').modal('hide');
                getProducts()
            } else {
                alert('Erro ao editar produto')
            }
        }
    })
}