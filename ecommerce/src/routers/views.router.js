//importación de módulos
const { Router } = require ("express")

const router = Router()

const products = require('../../mockDB/Products.json')

//ruta para home.handlebars
router.get('/home', (req, res) => {
    res.render('home', { products })
})

//ruta para realTimeProducts.handlebars
router.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log(error);
        res.render('error', { message: 'Error al intentar obtener la lista de productos.' });
    }
})

router.post('/', async (req, res) => {
    try {
        res.render('realTimeProducts', {
            products
        })
    } catch (error) {
        console.log(error);
        res.render("Error al intentar obtener la lista de productos!");
        return;
    }
})


module.exports = router