const express = require ('express');

const router = express.Router();
const productController = require ('../controllers/productController');

/*Ruteo Karen - productCart & productDetail*/
router.get ('/productCart', productController.productCart);

router.get ('/productDetail', productController.productDetail);

router.get ('/pago', productController.checkout);

router.get ('/login', productController.login);

module.exports = router;