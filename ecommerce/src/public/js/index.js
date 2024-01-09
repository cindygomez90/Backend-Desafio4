const socket = io() 


const form = document.getElementById('product-form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const thumbail = document.getElementById('thumbail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value

    socket.emit('productoCargado', {
        Nombre: title.value,
        Descripción: description.value,
        Precio: price.value,
        Imagen: thumbail.value,
        Código: code.value,
        Stock: stock.value
    })

    form.reset()
})