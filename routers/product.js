const express = require ('express');

const router = express.Router();
const productController = require ('../controllers/productController');

/*Ruteo Karen - productCart & productDetail*/
router.get ('/productCart', productController.productCart);

router.get ('/productDetail', productController.productDetail);

module.exports = router;