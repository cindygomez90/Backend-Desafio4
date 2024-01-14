const socket = io() 

function addProduct() {

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let price = document.getElementById("price").value
    let thumbail = document.getElementById("thumbail").value
    let code = document.getElementById("code").value
    let stock = document.getElementById("stock").value
    
    if (parseFloat(price) < 0 || parseInt(stock) < 0) {
        alert("El precio y el stock no pueden ser números negativos.")
        return;
    }

    socket.emit("addProduct", { title, description, price, thumbail, code, stock})
}

function deleteProduct(pid) {
    socket.emit("deleteProduct", {pid})
}

socket.on("updateProducts", (data) => {
    console.log("Tipo de 'data.products':", typeof data)
    console.log("Contenido de 'data.products':", data)

const productList = document.getElementById("productList")

if (productList && Array.isArray(data)) {
    productList.innerHTML = ""
    
    data.forEach((product) => {
    const productContainer = document.createElement("li")
        productContainer.innerHTML = `   
        <li>   
        Nombre: ${product.title}<br>
        Descripción: ${product.description}<br>
        Precio: ${product.price}<br>
        Imagen: ${product.thumbail}<br>
        Código: ${product.code}<br>
        Stock: ${product.stock}<br>
        
        <button type="button" onclick="deleteProduct('${product.pid}')">Eliminar</button>
        </li>
        `;
        productList.appendChild(productContainer);
    })
} else {
    console.log("Error: La estructura de datos de 'data' no es válida.")
}
})