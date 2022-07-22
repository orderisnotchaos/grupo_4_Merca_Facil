const { check } = require('express-validator');

const validationArray = [
    check('name').notEmpty().withMessage('debe escribir un nombre'),
    check('price').notEmpty().withMessage('debe ingresar un precio en formato numérico'),
    check('description').notEmpty().withMessage('debe escirbir una descripción')
];


module.exports = validationArray;