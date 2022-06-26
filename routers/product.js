const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get ('/carrito', productController.productCart);
router.get ('/detail/:id', productController.detail);
router.get ('/pago', productController.checkout);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/crear', productController.crear );
module.exports = router;