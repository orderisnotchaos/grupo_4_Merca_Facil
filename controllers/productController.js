const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProducto = {
   
    productCart: (req, res) =>{
        res.render (path.join(__dirname,"../views/productCart.ejs"));
    },

    
    detail: (req, res) =>{
        let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
        res.render("productDetail", { title: product.name, product })
    },
    
  
    checkout: (req, res) =>{
        res.render (path.join(__dirname,"../views/checkout.ejs"));
    },

    mispedidos: (req, res) =>{
        res.render (path.join(__dirname,"../views/mispedidos.ejs"));
    },
    crear: (req, res) =>{

        res.render ( path.join(__dirname, "../views/crearProducto.ejs"));
    },
};

module.exports = controladorProducto;