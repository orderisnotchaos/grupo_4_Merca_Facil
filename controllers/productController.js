const res = require('express/lib/response');
const path = require('path');

const controladorProducto = {
    /*Ruteo Karen - productCart & productDetail*/
    productCart: (req, res) =>{
        res.render (path.join(__dirname,"../views/productCart.ejs"));
    },

    productDetail: (req, res) =>{
        res.render (path.join(__dirname,"../views/productDetail.ejs"));
    },

    checkout: (req, res) =>{
        res.render (path.join(__dirname,"../views/checkout.ejs"));
    }

};

module.exports = controladorProducto;