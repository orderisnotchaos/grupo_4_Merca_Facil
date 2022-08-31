const express = require ('express');
const router = express.Router();
const multer =require("multer")
const path = require('path');
const fileUpload = require('../middlewares/fileUpload');
const validationArray = require('../middlewares/validateDataProduct');

const productController = require ('../controllers/productController');
router.get ('/listadoProducts', productController.listado);


router.get ('/', productController.productos);

router.get('/create', productController.crear);
router.post('/create', productController.guardar);

//router.get ('/create', productController.mostrarCrear);
//router.post('/create',fileUpload.single('image'), validationArray, productController.procesarCrear);

router.get ('/detail/:id', productController.detail);
 
router.get ('/edit/:id', productController.edit);
router.post ('/edit/:id', productController.update);
//router.put ('/edit/:id',fileUpload.single('image'), productController.update);

router.delete('/delete/:id', productController.destroy);


router.get ('/productCart', productController.productCart);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;

