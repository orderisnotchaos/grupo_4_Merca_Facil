const res = require('express/lib/response');
const path = require('path');

const controladorMain = {
    
    contacto: (req, res) =>{
        res.render (path.join(__dirname,"../views/contacto.ejs"));
    },

    sobrenosotros: (req, res) =>{
        res.render (path.join(__dirname,"../views/sobrenosotros.ejs"));
    }

};

module.exports = controladorMain;