const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer');
const path = require('path');
const uploadFile = require('../middlewares/uploadFileUsers');
const userValidations = require('../middlewares/validateDataUser');
// ************ Controller Require ************
const userController = require ('../controllers/userController');

/*** GET ALL USERS ***/
//router.get ('/', userController.nombreDelControlador);

/*** CREATE NEW USER ***/ 
router.get ('/register', userController.register);
router.post ('/register', uploadFile.single('avatar'), userValidations, userController.processRegister);

/*** DELETE USER***/ 
router.delete('/delete/:id', userController.destroy);

/*** LOGIN ***/ 
router.get ('/login', userController.login);

router.post ('/login', [

    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 5}).withMessage('La Contraseña debe tener al menos 5 caracteres')

], userController.processLogin);

router.get ('/check', function (req, res){

    if(req.session.usuarioLogueado == undefined){
        res.send("No estas logueado");
    }else{
        res.send("El usuario logueado es" + req.session.usuarioLogueado.email)
    };

});

/*** LOGOUT ***/ 
router.get('/logout', userController.logout);
 
module.exports = router;