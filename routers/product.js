const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get ('/', productController.productos);
router.get ('/detail/:id', productController.detail);
router.get ('/carrito', productController.productCart);
router.get ('/create', productController.crear);
router.get ('/edit/:id', productController.edit);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;

