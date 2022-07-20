//const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');
const { off } = require('process');
const { validationResult } = require('express-validator');
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
    
    mostrarCrear: (req, res) =>{
        res.render ( path.join(__dirname, "../views/crearProducto.ejs"));
    },

	procesarCrear: (req, res, next) =>{
		let errors = validationResult(req);

		if(errors.isEmpty()){
			res.render(path.join(__dirname, "../views/productoGuardado.ejs"));
		} else{
			console.log(errors);
			res.render(path.join(__dirname, "../views/crearProducto.ejs"), {errors:errors.array()});
		}

		/*
		if( req.file === undefined ){
			
			const error = new Error('por favor seleccione un archivo');
			error.httpStatusCode = 400;
			return next(error);

		}else if(req.file.mimetype === 'image/png'){

			req.body.image = req.file.filename;
			req.body.id = products[ products.length-1 ].id+1 ;
			products.push(req.body);
			fs.writeFile(productsFilePath,JSON.stringify(products),'utf8',(err) => {
				if (err)

				  console.log(err);

				else {

				  console.log("File written successfully\n");
				  console.log("The written has the following contents:");

				}});
			res.render(path.join(__dirname, "../views/productoGuardado.ejs"));

		}else{

			const error = new Error('por favor seleccione un archivo de tipo imagen png');
			error.httpStatusCode = 400;
			return next(error);

		}
		*/
		next();
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
    	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let productDestroyed = products.filter( function( product ){

			return product.id !== id;

		});

		console.log( productDestroyed );

		fs.writeFileSync( productsFilePath , JSON.stringify( productDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	}
    
};

module.exports = controladorProducto;