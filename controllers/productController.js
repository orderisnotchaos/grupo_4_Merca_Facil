const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProducto = {
   
    productCart: (req, res) =>{
        res.render (path.join(__dirname,"../views/productCart.ejs"));
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

    productos: (req, res) =>{
        let despensaProducts = products.filter(product => product.category === "despensa")
        let bebidasProducts = products.filter(product => product.category === "bebidas")
        let mascotasProducts = products.filter(product => product.category === "mascotas")
        let bebesProducts = products.filter(product => product.category === "bebes")
        let cuidadoPersonalProducts = products.filter(product => product.category === "cuidado-personal")
        let limpiezaProducts = products.filter(product => product.category === "limpieza")

  		res.render ("productos",{despensaProducts, bebidasProducts, mascotasProducts, bebesProducts, cuidadoPersonalProducts, limpiezaProducts}); 
	},

    detail: (req, res) =>{
        let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
        res.render("productDetail", { title: product.name, product });
    },

    edit: (req, res) => {
		let id = req.params.id //El id que nos requiere por la url el usuario
		let editProduct = products.find(producto => producto.id == id)
		res.render("edit", { editProduct });
	},  
    
};

module.exports = controladorProducto;