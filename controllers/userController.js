const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');


const userController = {

    login: (req, res) => {

        if(req.session.user != undefined){
            res.render('logueado');
        }
        return res.render('login');
    },

    processLogin:(req,res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
           db.User.findOne({
               where: {email:req.body.email}
           })
           .then((user)=>{
            if(user !== null){
                req.session.user ={
                    id:user.id,
                    userName :user.firstName + "" + user.lastName,
                    email:user.email,
                    avatar :user.avatar,
                    isAdmin: user.isAdmin,
                    password: user.password,
                    address: user.address,
                    phone:  user.phone
                } 
        
                if(req.body.recordar != undefined){
                    res.cookie('recordame', req.session.user.email, { maxAge: 5000*60})
                }                                                
                res.redirect('/')
                 }else{
                res.render('login', {errors: ' mail o password no coinciden'});
                }
            })             
        }else{
            res.render('login2',{
                errors: errors.mapped(),
                title: 'Login',
                session: req.session
                
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
        res.render ("register");
    },

    processRegister:(req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let {firstName, lastName, email, password, isAdmin, avatar, address, phone} = req.body

               db.User.create({                    
                    firstName: firstName,  
                    lastName: lastName,
                    email: email,
                    password: password,
                    isAdmin: isAdmin,
                    avatar:"image.jpg" + "" + avatar,
                    address: address,
                    phone: phone,
                })            
                    .then(()=>{
                     res.redirect('/users/login') //por que a login???
                    })
   
       }else{
            res.render('register', { errors: errors.mapped(),})
        };                 
    },

	usersList: function(req, res) { //INTENTAR HACER QUE SOLO ABRA EL RENDER USERLIST COMO ADMIN.
        db.User.findAll()
            .then (function(users){
             res.render("usersList", {users:users})
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

        .then(function(user) {

            if(isAdmin = false){
                res.redirect('/users/list')
            
            }else

             {res.render("userDetails", {user:user, isAdmin})};

        });
    },

    editUser: (req, res) => {

        db.User.findByPk(req.params.id)

        .then(function(user) {
         res.render("editUser", {user:user});

        });
    },

    updateUser: (req, res) => {
        db.User.update({

                firstName: req.body.firstName,  
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                avatar:req.body.avatar, //Antes: "image.jpg" + "" + avatar,
                address: req.body.address,
                phone: req.body.phone,
        }, {
                where: {
                 id: req.params.id
                }
        });
        res.redirect("/users/list"); //antes ("/users/list" + req.params.id)
    },

    deleteUser: (req, res) => {
        db.User.destroy({
            where: {
             id: req.params.id
            }
        });
     res.redirect("/user/lists");
    },

};


module.exports = userController;


