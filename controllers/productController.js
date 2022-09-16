const path = require('path');
const { off } = require('process');
const fs = require('fs');
const { validationResult } = require('express-validator');
let db= require ("../database/models");
const { Op } = require("sequelize");

const controladorProducto = {

	crear: function (req, res){

			db.Category.findAll()
			.then(function (categories){
				return res.render("crearProducto", {categories, user:req.session.user});
			});
    },

    guardar: function (req, res){
        db.Product.create({
			name: req.body.name,
            price: req.body.price,
            category_id: req.body.category, 
            description: req.body.description,
            image: req.body.image,
			quantity: req.body.quantity
        }).then (function(response){
			res.redirect("/products");
		})
    },

	listado: function(req, res){
        db.Product.findAll()
            .then (function(products){
            res.render("listadoProducts", {products:products, user:req.session.user})
        	});
	},

	detail: function(req, res){
		let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}
        db.Product.findByPk(req.params.id , {include:[
			{ model:db.Category, as:'category'}
			]})
            .then(function(products) {
            res.render("productDetail", {products:products, isAdmin, user:req.session.user})
        })
    },
   
	edit: function(req, res){
        let pedidoProduct = db.Product.findByPk(req.params.id);
        let pedidoCategory = db.Category.findAll();

        Promise.all([pedidoProduct, pedidoCategory] )
            .then(function([products, categories]){
            res.render("edit", {products:products, categories:categories, user:req.session.user})
        })
    },

    update: function(req, res){
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category, 
            description: req.body.description,
            image:req.body.image,
			quantity: req.body.quantity         
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/products");
    },

	search: async (req, res) => {
		let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}

        const keyword = req.query.busqueda;
        const products = await db.Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${keyword}%`
                }
            }
        })       
        res.render("products", { products:products, isAdmin, user:req.session.user })
    },  

    productos: (req, res) =>{
		let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}

		db.Product.findAll()
			.then (function(productos){
				let despensaProducts = productos.filter(product => product.category === "despensa")
				let bebidasProducts = productos.filter(product => product.category === "bebidas")
				let mascotasProducts = productos.filter(product => product.category === "mascotas")
				let bebesProducts = productos.filter(product => product.category === "bebes")
				let cuidadoPersonalProducts = productos.filter(product => product.category === "cuidado-personal")
				let limpiezaProducts = productos.filter(product => product.category === "limpieza")
		
			res.render ("products",{isAdmin, products:productos, despensaProducts, bebidasProducts, mascotasProducts, bebesProducts, cuidadoPersonalProducts, limpiezaProducts, user:req.session.user}); 
			
		})
	},
	
	productCart: (req, res) =>{

        res.render (path.join(__dirname,"../views/productCart.ejs"), {user:req.session.user});
    },
  
    checkout: (req, res) =>{

        res.render (path.join(__dirname,"../views/checkout.ejs"), {user:req.session.user});
    },

    mispedidos: (req, res) =>{

        res.render (path.join(__dirname,"../views/myOrders.ejs"), {user:req.session.user});
    },

	destroy: async function(req, res){

	const product = await db.Product.findByPk(req.params.id);
			if(product !== null){
				fs.unlinkSync(path.resolve(__dirname, '../public/images/'+product.image))
			}

		if(req.params.id !== null){
			db.Product.destroy({
				where: {
					id: req.params.id
				}
			});
		}
        res.redirect("/products");
    } 
};

module.exports = controladorProducto;