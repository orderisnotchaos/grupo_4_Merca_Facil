const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path =require('path');

let multerDiskStorage = multer.diskStorage({

	destination: (req, file, cb) =>{
		if(req.body.category == 'bebes'){
			cb(null, path.join(__dirname, '../public/images/products/bebes'));
		} else if(req.body.category == 'despensa'){

			cb(null, path.join(__dirname, '../public/images/products/despensa'));

		} else if(req.body.category == 'bebidas'){

			cb(null, path.join(__dirname, '../public/images/products/bebidas'));

		} else if(req.body.category == 'mascotas'){

			cb(null, path.join(__dirname, '../public/images/products/mascotas'));

		} else if(req.body.category == 'cuidado-personal'){

			cb(null, path.join(__dirname, '../public/images/products/cuidado-personal'));

		} else if(req.body.category == 'limpieza'){

			cb(null, path.join(__dirname, '../public/images/products/limpieza'));

		} else{

			console.log('no se encuentra la categoria');

		}
	},
	filename: (req, file, cb) =>{
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

let fileUpload = multer({ storage: multerDiskStorage });
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
router.put ('/edit/:id', productController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.destroy);


router.get ('/carrito', productController.productCart);
router.get ('/mispedidos', productController.mispedidos);
router.get ('/pago', productController.checkout);

module.exports = router;

