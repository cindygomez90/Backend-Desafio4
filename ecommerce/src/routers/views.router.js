//importación de módulos
const { Router } = require ("express")

const router = Router()

const products = require('../../mockDB/Products.json')

//ruta para home.handlebars
router.get('/home', (req, res) => {
    res.render('home', { products })
})

//ruta para realTimeProducts.handlebars
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
})

module.exports = router