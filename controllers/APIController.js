const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');


module.exports = {
    
	usersList: function(req, res) { 
        
        db.User.findAll()
            .then (function(users){
                 res.json(users)

            });		
	},
    userDetails: (req, res) => {

        db.User.findByPk(req.params.id)

        .then(function(us) {

             res.json(us);

        });
    },

    listado: function(req, res){
        db.Product.findAll()
            .then (function(products){
            res.json(products)
        	});
	},

    detail: function(req, res){

        db.Product.findByPk(req.params.id , {include:[
			{ model:db.Category, as:'category'}
			]})
            .then(function(products) {
            res.json(products)
        })
    },

    categoriesList: function (req, res, next){

        db.Category.findAll().then(function(categories){
            res.json(categories);
        })
    }
};

