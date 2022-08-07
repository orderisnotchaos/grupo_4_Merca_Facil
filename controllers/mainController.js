const res = require('express/lib/response');
const path = require('path');

const controladorMain = {
    
    index: (req, res) =>{
        res.render (path.join(__dirname,"../views/index.ejs"));
    },

    contacto: (req, res) =>{
        res.render (path.join(__dirname,"../views/contact.ejs"));
    },

    sobrenosotros: (req, res) =>{
        res.render (path.join(__dirname,"../views/aboutUs.ejs"));
    },

    logout: (req, res) =>{

        req.session = null;
        req.cookies.recordame = null;
        res.redirect('/');
    }

};

module.exports = controladorMain;