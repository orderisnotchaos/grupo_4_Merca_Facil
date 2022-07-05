const express = require ('express');
const router = express.Router();
const multer =require("multer")
const path = require('path');
const fileUpload = require('../middlewares/fileUpload');

// ************ Controller Require ************
const productController = require ('../controllers/productController');

/*** GET ALL PRODUCTS ***/ 
router.get ('/', productController.productos);

/*** CREATE ONE PRODUCT ***/ 
router.get ('/create', productController.mostrarCrear);
router.post('/create',fileUpload.single('image'), productController.procesarCrear);
/*router.post('/',fileUpload.single('image'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get ('/detail/:id', productController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get ('/edit/:id', productController.edit);
router.put ('/edit/:id',fileUpload.single('image'), productController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.destroy);


router.get ('/carrito', productController.productCart);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;

