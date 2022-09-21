const res = require('express/lib/response');
const path = require('path');
let db= require ("../database/models");

const controladorMain = {
    
    index: (req, res) =>{
        db.Product.findAll()
            .then (function(products){

                res.render (path.join(__dirname,"../views/index.ejs"), {products:products, user:req.session.user});
        	});
        
    },

    contacto: (req, res) =>{
        res.render (path.join(__dirname,"../views/contact.ejs"), {user:req.session.user});
    },

    sobrenosotros: (req, res) =>{
        res.render (path.join(__dirname,"../views/aboutUs.ejs"),{user:req.session.user});
    },

    logout: (req, res) =>{

        req.session = null;
        req.cookies.recordame = null;
        res.redirect('/');
    }

};

module.exports = controladorMain;