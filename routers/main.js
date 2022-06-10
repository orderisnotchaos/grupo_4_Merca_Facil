const express = require ('express');

const router = express.Router();
const productController = require ('../controllers/mainController');

/*Ruteo Karen - productCart & productDetail*/
router.get ('/contacto', productController.contacto);

module.exports = router;