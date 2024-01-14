//importación del módulo
const express = require ("express")
const productsRouter = require ("./routers/products.router")
const cartsRouter = require ("./routers/carts.router.js")
const handlebars  = require('express-handlebars')
const viewsRouter = require ("./routers/views.router.js")
const { Server }  = require('socket.io') 
const ProductManager = require("../src/managers/productsManager.js")
const productManager = new ProductManager()

const app = express()
const PORT = 8080 || process.env.PORT

//configuración de handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")  

//para servir los archivos estáticos
app.use(express.static(__dirname + '/public'))

app.use(express.json())   
app.use(express.urlencoded({ extended: true }))

//llamado a los archivos de vista
app.use("/", viewsRouter)
app.use("/realtimeproducts", viewsRouter)

//llamado a los archivos routers
app.use ('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)

//configuración socket del lado del server
const httpServer = app.listen(PORT, () => {
    console.log('Haciendo Primera Entrega de Proyecto Final')
} )

const io = new Server (httpServer)

io.on('connection', async (socket) => {
    console.log('cliente conectado')
    
    socket.on("addProduct", async (data) => {
        const newProduct = {
            title: data.title,
            description: data.description,
            price: data.price,
            thumbail: data.thumbail,
            code: data.code,
            stock: data.stock,            
        }
        await productManager.addProduct(newProduct)
        
        const updatedProducts = await productManager.getProducts()
        io.emit("updateProducts", updatedProducts)
            });
    
    socket.on("deleteProduct", async (data) => {
        const pid = data.pid;
        await productManager.deleteProduct(parseInt(pid))
        const updatedProducts = await productManager.getProducts()
        io.emit("updateProducts", updatedProducts)
        })
    })


