const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

const userController = {

    login: (req, res) => {

        if(req.session.user != undefined){
            res.render('logueado',{user:req.session.user});
        }
        return res.render('login',{user:req.session.user});
    },

    processLogin:(req,res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){

           db.User.findOne({
               where: {email:req.body.email,}
           })
           .then((user)=>{
            if(user !== null && bcrypt.compareSync(req.body.password, user.password)){
                db.User.findOne({
                    where: {
                        id: user.id,
                    },    
                    include : [{model:db.Product, as:'products'}]
                }).then(userProducts => {
                    db.ProductCart.findAll({
                        where:{
                            user_id:user.id
                        }
                    }).then(product_cart =>{
                        req.session.user ={
                            id:user.id,
                            userName :user.firstName + "" + user.lastName,
                            email:user.email,
                            avatar :user.avatar,
                            isAdmin: user.isAdmin,
                            password: user.password,
                            address: user.address,
                            phone:  user.phone,
                            cart : []
                        } 
                        for(let i=0; i< userProducts.products.length;i++){
                            for(let j=0; j<product_cart.length;j++){
                                if(userProducts.products[i].dataValues.id == product_cart[j].product_id){
                                    userProducts.products[i].dataValues.quantity = product_cart[j].quantity; 
                                }
                            }
                            req.session.user.cart.push(userProducts.products[i].dataValues);
                        }
                        if(req.body.recordar != undefined){
                            res.cookie('recordame', req.session.user.email, { maxAge: 5000*60});
                        } 
                        res.redirect('/');
                    });
                    
                });
                            
                 }else{
                res.render('login', {errors: ' mail o password no coinciden', user:req.session.user});
                }
            })             
        }else{
            res.render('login',{
                errors: errors.mapped(),
                title: 'Login',
                session: req.session,
                user:req.session.user
                
            })
        };                   
    },

    logout: (req, res) => {
        req.session.destroy();
            
            if(req.cookies.recordame){
                res.cookie('recordame','', {maxAge: -1});
            }
            res.redirect('/');
    },

    register: (req, res) => {
        res.render ("register", {user:req.session.user});
    },

    processRegister:(req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let {firstName, lastName, email, password, isAdmin, avatar, address, phone} = req.body

               db.User.create({                    
                    firstName: firstName,  
                    lastName: lastName,
                    email: email,
                    password: bcrypt.hashSync(password, 10),
                    isAdmin: isAdmin,
                    avatar: avatar,
                    address: address,
                    phone: phone,
                })            
                    .then(()=>{
                     res.redirect('/users/login')
                    })
   
       }else{
            res.render('register', { errors: errors.mapped(),user:req.session.user})
        };                 
    },

	usersList: function(req, res) { //INTENTAR HACER QUE SOLO ABRA EL RENDER USERLIST COMO ADMIN.
        let isAdmin;

		if(req.session.user != undefined){
			isAdmin = req.session.user.isAdmin == '1' ? true : false;
		}else{
			isAdmin =false;
		}
        db.User.findAll()
            .then (function(users){
                if(isAdmin){
                    res.render("usersList", {users:users, user:req.session.user})
                }else{
                    //TODO: crear un ejs para el caso en el que no se tenga permiso para acceder a la página
                    res.send('no tienes permiso para ingresar a ésta página');
                }
            });		
	},

    userDetails: (req, res) => { //INTENTAR HACER QUE SOLO ABRA EL RENDER USERDETAILS COMO ADMIN.
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

             {res.render("userDetails", {us:us, isAdmin, user:req.session.user})};

        });
    },

    editUser: (req, res) => {

        db.User.findByPk(req.params.id)

        .then(function(us) {
         res.render("editUser", {us:us, user:req.session.user});

        });
    },

    updateUser: (req, res) => {

        db.User.update({

                firstName: req.body.firstName,  
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                isAdmin: (req.body.isAdmin == 'client') ? 0 : 1,
                avatar:req.body.avatar, //Antes: "image.jpg" + "" + avatar,
                address: req.body.address,
                phone: req.body.phone,
        }, {
                where: {
                 id: req.params.id
                }
        });
        res.redirect("/users/usersList");  //Antes ("/users/usersList" + req.params.id)
    },

    deleteUser: (req, res) => {
        db.User.destroy({
            where: {
             id: req.params.id
            }
        });
        db.ProductCart.destroy(
            {
                where:{
                    user_id:req.params.id,
                }
            }
        );

     res.redirect("/users/usersList");
    },

    productCart: function(req,res,next){

        if(req.session.user !== undefined){

            res.render('productCart', {user:req.session.user, cart:req.session.user.cart});
            
        }else{
            res.redirect("/users/login");
        }
    },

    processPurchase: function(req, res){
        if(req.session.user !== undefined){
            db.ProductCart.destroy(
                {
                    where:{
                        user_id:req.session.user.id,
                    }
                }
            ).then(()=>{
                req.session.user.cart = [];
                res.redirect('/');
            });
        }
    }

};

module.exports = userController;

