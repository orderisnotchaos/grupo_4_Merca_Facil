const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models')


const controladorUsuario = {

    login: (req, res) => {

        if(req.session.user != undefined){
            return res.render('logueado');
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
                res.cookie('recordame','', {maxAge: -1})
            }
            res.redirect('/');
    },

    register: (req, res) => {
        res.render ("register");
    },

    processRegister:(req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let {firstName,lastName,email,password,isAdmin,avatar,address,phone} = req.body

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
                    
                   res.redirect('/users/login')
                })
                
                
            }else{
                res.render('register', {
                    
                })
            };                 
        },

    usersList: (req, res) => {
        db.Users.findAll()

    .then(function() {
        res.render("usersList", {users:users})
    });
    },

    userDetails: (req, res) => {
        db.User.findByPk(req.params.id)

    .then(function(user) {
        res.render("userDetails", {user:user})
    });
    },

    //editUser: (req, res) => {

     // let userRequest = db.Users.findByPk(req.param.id);

      //  let userRequests = db.users.findAll(req.params.id);

    //   Promise.all

   //},

   delete: (req, res) => {
    db.Users.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect("/users");

   },

    destroy: (req, res) => {

		let usersJSON = JSON.parse( fs.readFileSync( usersFilePath, 'utf-8' ) );
		const id = +req.params.id;

		let userDestroyed = usersJSON.filter( function( user ){

			return user.id !== id;

		});

		console.log( userDestroyed );

		fs.writeFileSync( usersFilePath , JSON.stringify( userDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );
    
    },

    };

module.exports = controladorUsuario;


