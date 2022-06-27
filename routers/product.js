const express = require ('express');
const router = express.Router();

// ************ Controller Require ************
const productController = require ('../controllers/productController');

/*** GET ALL PRODUCTS ***/ 
router.get ('/', productController.productos);

/*** CREATE ONE PRODUCT ***/ 
router.get ('/create', productController.crear);
/*router.post('/',uploadFile.single('image'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get ('/detail/:id', productController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get ('/edit/:id', productController.edit);
router.put ('/edit/:id', productController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.destroy);


router.get ('/carrito', productController.productCart);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;

