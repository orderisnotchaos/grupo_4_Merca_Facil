const { body } = require ('express-validator');
const path = require('path');


const userValidations = [
    body('firstName').notEmpty().withMessage('Tienes que completar el formulario con tu nombre'),
    body('lastName').notEmpty().withMessage('Tienes que completar el formulario con tu apellido'),
    body('email').isEmail().withMessage('Tienes que completar el formulario con tu email'),
    body('password').notEmpty().withMessage('Tienes que completar el formulario con una contraseña'),
    body('phone').notEmpty().withMessage('Tienes que completar el formulario con tu telefono'),
    body('address').notEmpty().withMessage('Tienes que completar el formulario con tu dirección'),
    
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen para tu perfil');

        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    } )
];

module.exports = userValidations;
