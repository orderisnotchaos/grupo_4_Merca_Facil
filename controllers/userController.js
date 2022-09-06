const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models');

const controladorUsuario = {

    login: (req, res) => {

        if(req.session.user != undefined){
            res.render('logueado');
        }
        
        res.render('login');
    },


    processLogin: (req, res) => {

        let errors = validationResult(req);

        if(errors.isEmpty()){

            let usuarioAlogear = usersJSON.find(user => user.email === req.body.email);

            if( usuarioAlogear == undefined ){
                res.render('login',{logueoInvalido:'usuario o contraseña inválidos'});
            }else{

                if(usuarioAlogear.password === req.body.password ){
                    req.session.user ={
                        ...req.body,
                        userType: usuarioAlogear.userType
                    };

                    if(req.body.recordar != undefined){
                        res.cookie('recordame', usuarioAlogear.email, {maxAge: 60000000000});
                    }
                        res.render('index');
                }else{
                    res.render('login', {logueoInvalido:'usuario o contraseña inválidos'});
                }
                }
        }else{
            res.render('login',{errors:errors.array()});
        }
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

    processRegister: (req, res, next) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {

            return res.render(path.join(__dirname,"../views/register.ejs"), {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            
			req.body.image = req.file.filename;
			req.body.id = usersJSON[ usersJSON.length-1 ].id+1 ;

			usersJSON.push(req.body);

			fs.writeFile(usersFilePath,JSON.stringify(usersJSON),'utf8',(err) => {
				if (err)

				  console.log(err);

				else {

				  console.log("User created successfully\n");

				}});

			res.render(path.join(__dirname, "../views/login.ejs"));


        }

        next();
    },

    usersList: (req, res) => {
        db.Users.findAll()

        .then(function() {
            res.render("usersList", {users:users});
        })
    },

    userDetails: (req, res) => {

        db.User.findByPk(req.params.id).then((user) =>{

            res.render("userDetails", {user});
        });
    },

    //editUser: (req, res) => {

       // let userRequest = db.Users.findByPk(req.param.id);

        //let userRequests = db.users.findAll();

       // Promise.all

   // },

    destroy: (req, res) => {

		let usersJSON = JSON.parse( fs.readFileSync( usersFilePath, 'utf-8' ) );
		const id = +req.params.id;

		let userDestroyed = usersJSON.filter( function( user ){

			return user.id !== id;

		});

		console.log( userDestroyed );

		fs.writeFileSync( usersFilePath , JSON.stringify( userDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );
    
    }
};

module.exports = controladorUsuario;