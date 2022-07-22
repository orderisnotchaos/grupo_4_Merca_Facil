const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');
const path = require('path');
const multer = require('multer');
const validations = require('../middlewares/validateDataUser');
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

const userController = require ('../controllers/userController');



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


module.exports = router;