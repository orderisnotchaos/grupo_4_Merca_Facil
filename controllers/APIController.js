const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');


module.exports = {
    
	usersList: function(req, res) { 
        let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}
        db.User.findAll()
            .then (function(users){
                if(isAdmin){
                    res.json(users)
                }else{
                
                    res.send('no tienes permiso para ingresar a ésta página');
                }
            });		
	},
    userDetails: (req, res) => {
        let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}
        db.User.findByPk(req.params.id)

        .then(function(us) {

            if(isAdmin == false){
                res.redirect('/users/usersList')
            
            }else

             {res.json(us)};

        });
    },

    listado: function(req, res){
        db.Product.findAll()
            .then (function(products){
            res.json(products)
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
            res.json(products)
        })
    },
};

