const path = require('path');
const fs = require('fs');
const { off } = require('process');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let db= require ("../database/models");
const Category = require('../database/models/Category');

/*db.Product.findAll()
    .then (function(data){
    products = data
})*/

const controladorProducto = {

	crear: function (req, res){
        db.Category.findAll()
		.then (function(productos){
			db.Category.findAll()
		.then(function (categories){
			return res.render("crearProducto", {categories:categories, products:productos});
		})
    })

    },

    guardar: function(req, res){

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
			console.log(products);
            res.render("listadoProducts", {products:products})
			console.log(db.Product)
        })		
	},

	detail: function(req, res){
		let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.userType == 'Admin' ? true : false;
		}else{
			isAdmin =false;
		}
        db.Product.findByPk(req.params.id , {include:[
			{ model:db.Category, as:'category'}
			]})
            .then(function(products) {
                res.render("productDetail", {products:products, isAdmin})
            })
    },
   

	edit: function(req, res){
        let pedidoProduct = db.Product.findByPk(req.params.id);

        let pedidoCategory = db.Category.findAll();

        Promise.all([pedidoProduct, pedidoCategory] )
            .then(function([products, categories]){
                res.render("edit", {products:products, categories:categories})
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

    productCart: (req, res) =>{

        res.render (path.join(__dirname,"../views/productCart.ejs"));
    },
  
    checkout: (req, res) =>{

        res.render (path.join(__dirname,"../views/checkout.ejs"));
    },

    mispedidos: (req, res) =>{

        res.render (path.join(__dirname,"../views/myOrders.ejs"));
    },
    
    /*mostrarCrear: (req, res) =>{

		if(req.session.user != undefined){

			if(req.session.user.userType == 'Admin'){

        		return res.render ( path.join(__dirname, "../views/crearProducto.ejs"));
			}else{

				return res.send('no tienes permiso para loguear en esta página');
			}
		}
		return res.send('no tienes permiso para loguear en esta página');
    },

	procesarCrear: (req, res, next) =>{
		let errors = validationResult(req);
		console.log(req.body);
		if(errors.isEmpty()){
			req.body.image = req.file.filename;
			req.body.id = products[ products.length-1 ].id+1 ;
			products.push(req.body);
			fs.writeFile(productsFilePath,JSON.stringify(products),'utf8',(err) => {
				if (err)

				  console.log(err);

				else {

				  console.log("File written successfully\n");

				}});

			res.render(path.join(__dirname, "../views/productSaved.ejs"));
		} else{

			res.render(path.join(__dirname, "../views/crearProducto.ejs"), {errors:errors.array()});
		}

		next();
	},*/

    productos: (req, res) =>{
		let isAdmin;

		if(req.session.user != undefined){

			isAdmin = req.session.user.userType == 'Admin' ? true : false;
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
		
			res.render ("products",{isAdmin, products:productos, despensaProducts, bebidasProducts, mascotasProducts, bebesProducts, cuidadoPersonalProducts, limpiezaProducts}); 
			
		})
	},

    /*edit: (req, res) => {
        const id = +req.params.id;
		let productDetail = products.filter( function( product ){

			return product.id === id;

		});
		productDetail = productDetail[ 0 ];
		res.render('edit', { title: productDetail.name, productToEdit: productDetail } );
	}, 
    
    update: (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;
        

		let editProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category ? category : products.find(product => product.id === id).category,
			description: description,
            image: req.file ? req.file.filename : products.find(product => product.id === id).image

		};	

		for( let i in products ) {

			if( products[ i ].id === id ) {

				products[ i ] = editProduct;
				break;
			}
		}

		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
		res.redirect( '/products' );

	},

	destroy : (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let productDestroyed = products.filter( function( product ){

			return product.id !== id;

		});

		console.log( productDestroyed );

		fs.writeFileSync( productsFilePath , JSON.stringify( productDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	}*/

	destroy: function(req, res){
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/products");
    }
    
};

module.exports = controladorProducto;