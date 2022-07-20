const express = require ('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { body } = require ('express-validator');

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

const validations = [
    body('nombre').notEmpty().withMessage('Tienes que completar el formulario con tu nombre'),
    body('apellido').notEmpty().withMessage('Tienes que completar el formulario con tu apellido'),
    body('cedula').notEmpty().withMessage('Tienes que completar el formulario con tu cedula'),
    body('telefono').notEmpty().withMessage('Tienes que completar el formulario con tu telefono'),
    body('email').isEmail().withMessage('Tienes que completar el formulario con tu email'),
    body('contraseña').notEmpty().withMessage('Tienes que completar el formulario con una contraseña'),
];

//FORMULARIO DE REGISTRO
router.get ('/registro', userController.registro);

//FORMULARIO DE PROCESAMIENTO DE REGISTRO
router.post ('/registro', uploadFile.single('avatar'), validations, userController.processRegister);

//FORMULARIO DE LOGIN
router.get ('/login', userController.login);

//FORMULARIO DE USUARIO sugerencia
//router.get('/profile/:userId, usersController.profile');


module.exports = router;