const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');
const path = require('path');
const multer = require('multer');
const validations = require('../middlewares/validateDataUser'); 
const userController = require ('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars')
    },

    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer( {storage} );




//FORMULARIO DE REGISTRO
router.get ('/registro', userController.registro);

//FORMULARIO DE PROCESAMIENTO DE REGISTRO
//FALTA RUTA DE FORMULARIO DE REGISTRO EN registro.ejs VER INFO METODO POST *****
router.post ('/registro', uploadFile.single('avatar'), validations, userController.processRegister);

//FORMULARIO DE LOGIN
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
    }
});

router.get('/logout', userController.logout)
 

module.exports = router;