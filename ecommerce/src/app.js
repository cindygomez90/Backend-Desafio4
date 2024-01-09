//importación del módulo
const express = require ("express")
const productsRouter = require ("./routers/products.router")
const cartsRouter = require ("./routers/carts.router.js")
const handlebars  = require('express-handlebars')
const viewsRouter = require ("./routers/views.router.js")
const { Server }  = require('socket.io') 

const app = express()
const PORT = 8080 || process.env.PORT

//configuración de handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")  

//para servir los archivos estáticos
app.use(express.static(__dirname + './public'))

app.use(express.json())   
app.use(express.urlencoded({ extended: true }))

app.use("/", viewsRouter)


//Llamado a los archivos routers
app.use ('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)

//configuración socket del lado del server
const httpServer = app.listen(PORT, () => {
    console.log('Haciendo Primera Entrega de Proyecto Final')
} )

const io = new Server (httpServer)

const products = []

io.on('connection', socket =>{
    console.log('cliente conectado')
    
    socket.on('productoCargado', data => {  
        console.log(data)
        products.push(data)
        
        io.emit('listadoActualizado', products) 
    })
    
})


