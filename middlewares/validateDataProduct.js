const { body } = require('express-validator');

const validationArray = [
    body('name').notEmpty().withMessage('debe escribir un nombre'),
    body('price').notEmpty().isNumeric().withMessage('debe ingresar un precio en formato numérico'),
    body('description').notEmpty().withMessage('debe escirbir una descripción'),
    body('image').notEmpty().withMessage('debe subir una imagen')
];


module.exports = validationArray;