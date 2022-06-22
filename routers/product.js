const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get ('/productCart', productController.productCart);
router.get ('/productDetail', productController.productDetail);
router.get ('/pago', productController.checkout);
router.get ('/mispedidos', productController.mispedidos);
router.get ( '/crearProducto', productController.crearProducto);
module.exports = router;