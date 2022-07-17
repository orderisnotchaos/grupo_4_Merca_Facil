const res = require('express/lib/response');


const { validatonResult } = require('express-validator')


const controladorUsuario = {

    login: (req, res) => {
        res.render (path.join(__dirname,"../views/login.ejs"));
    },

    registro: (req, res) => {
        res.render (path.join(__dirname,"../views/registro.ejs"));
    },

    processRegister: (req, res) => {
        const resultValidation = validatonResult(req);
        return res.send(resultValidation);
    },

    /* sugerencia perfil usuarip
    profile: (req, res) => {
        return res.render('userProfile'));
    },*/

};

module.exports = controladorUsuario;