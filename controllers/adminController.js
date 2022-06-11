const res = require('express/lib/response');
const path = require('path');

const controladorAdmin = {

    admin: (req, res) =>{
        res.render (path.join(__dirname,"../views/loginAdmin.ejs"));
    },

    panel: (req, res) =>{
        res.render (path.join(__dirname,"../views/panelAdmin.ejs"));
    }

};

module.exports = controladorAdmin;