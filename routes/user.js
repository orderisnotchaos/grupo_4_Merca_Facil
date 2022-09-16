const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer');
const path = require('path');
const uploadFile = require('../middlewares/uploadFileUsers');
const userValidations = require('../middlewares/validateDataUser');
const userController = require ('../controllers/userController');


//CREATE
router.get ('/register', userController.register);
router.post ('/register', uploadFile.single('avatar'), userValidations, userController.processRegister);

//READ
router.get("/usersList", userController.usersList);

//DETALLE USUARIO
router.get("/usersList/:id", userController.userDetails);

//UPDATE
router.get("/edit/:id", userController.editUser);
router.post("/edit/:id", uploadFile.single('avatar'), userController.updateUser);


//DELETE
router.delete("/delete/:id", userController.deleteUser);

//LOGIN & LOGOUT
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

router.get('/logout', userController.logout);


module.exports = router;