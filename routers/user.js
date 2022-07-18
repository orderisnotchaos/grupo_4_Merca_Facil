const express = require ('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { check, body } = require ('express-validator');

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
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');

        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    } )
];

//FORMULARIO DE REGISTRO
router.get ('/registro', userController.registro);

//FORMULARIO DE PROCESAMIENTO DE REGISTRO
//FALTA RUTA DE FORMULARIO DE REGISTRO EN registro.ejs VER INFO METODO POST *****
router.post ('/registro', uploadFile.single('avatar'), validations, userController.processRegister);

//FORMULARIO DE LOGIN
router.get ('/login', userController.login);


router.post ('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 6}).withMessage('La Contraseña debe tener al menos 6 caracteres'),

], userController.processLogin);


module.exports = router;