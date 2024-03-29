const express = require ('express');
const router = express.Router();
const fileUpload = require('../middlewares/fileUpload');
const validationArray = require('../middlewares/validateDataProduct');

const productController = require ('../controllers/productController');


router.get ('/', productController.productos);

router.get('/create', productController.crear);
router.post('/create',fileUpload.single('image'),validationArray, productController.guardar);

router.get ('/listadoProducts', productController.listado);

//router.get ('/create', productController.mostrarCrear);
//router.post('/create',fileUpload.single('image'), validationArray, productController.procesarCrear);

router.get ('/detail/:id', productController.detail);
 
router.get ('/edit/:id', productController.edit);
router.post ('/edit/:id',fileUpload.single('image'), productController.update);
//router.put ('/edit/:id',fileUpload.single('image'), productController.update);
router.get('/search', productController.search);


router.delete('/delete/:id', productController.destroy);


router.post ('/addtocart/:id', productController.productCart);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;