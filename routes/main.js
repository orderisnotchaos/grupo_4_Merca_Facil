const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');

router.get ('/', mainController.index);
router.get ('/contact', mainController.contacto);
router.get ('/aboutUs', mainController.sobrenosotros);
router.get ('/logout',mainController.logout);
module.exports = router;