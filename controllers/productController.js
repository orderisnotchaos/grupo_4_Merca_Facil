const res = require('express/lib/response');
const path = require('path');

const controladorProducto = {
    /*Ruteo Karen - productCart & productDetail*/
    productCart: (req, res) =>{
        res.sendFile (path.join(__dirname,"../views/productCart.html"));
    },

    productDetail: (req, res) =>{
        res.sendFile (path.join(__dirname,"../views/productDetail.html"));
    },

    checkout: (req, res) =>{
        res.render (path.join(__dirname,"../views/checkout.ejs"));
    },

    login: (req, res) =>{
        res.render (path.join(__dirname,"../views/login.ejs"));
    }

};

module.exports = controladorProducto;