const res = require('express/lib/response');
const path = require('path');

const controladorUsuario = {

    login: (req, res) =>{
        res.render (path.join(__dirname,"../views/login.ejs"));
    },

    registro: (req, res) =>{
        res.render (path.join(__dirname,"../views/registro.ejs"));
    }

};

module.exports = controladorUsuario;