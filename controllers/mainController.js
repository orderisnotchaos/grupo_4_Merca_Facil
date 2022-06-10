const res = require('express/lib/response');
const path = require('path');

const controladorMain = {
    /*Ruteo Karen - productCart & productDetail*/
    contacto: (req, res) =>{
        res.render (path.join(__dirname,"../views/contacto.ejs"));
    }

};

module.exports = controladorMain;