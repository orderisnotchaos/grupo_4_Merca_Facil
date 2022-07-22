const { body } = require ('express-validator');




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

module.exports = validations;