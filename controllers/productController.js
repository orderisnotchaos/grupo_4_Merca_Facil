const res = require('express/lib/response');
const path = require('path');

const controladorProducto = {
   
    productCart: (req, res) =>{
        res.render (path.join(__dirname,"../views/productCart.ejs"));
    },

    productDetail: (req, res) =>{
        res.render (path.join(__dirname,"../views/productDetail.ejs"));
    },

    checkout: (req, res) =>{
        res.render (path.join(__dirname,"../views/checkout.ejs"));
    },

    mispedidos: (req, res) =>{
        res.render (path.join(__dirname,"../views/mispedidos.ejs"));
    },
    crearProducto: (req, res) =>{

        res.render ( path.join(__dirname, "../views/crearProducto.ejs"));
    },
};

module.exports = controladorProducto;