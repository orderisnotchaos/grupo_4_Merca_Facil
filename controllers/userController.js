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
        }                       
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

            let {firstName,lastName,email,password,avatar,address,phone} = req.body

               db.User.create({                    
                    firstName: firstName,  
                    lastName: lastName,
                    email: email,
                    password: password,
                    isAdmin: 0,
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
            }                  
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

    /*processRegister: (req, res, next) => {
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
    },*/

     /*processLogin: (req, res) => {

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
                    }

                if(req.body.recordar != undefined){
                    res.cookie('recordame', usuarioAlogear.email, {maxAge: 60000000000});
                }
                    res.render('index');
                }else{
                    res.render('login', {logueoInvalido:'usuario o contraseña inválidos'})
                }
            }
        }else{
            res.render('login',{errors:errors.array()});
        };
    },*/

    //editUser: (req, res) => {

    

       // let userRequest = db.Users.findByPk(req.param.id);

        //let userRequests = db.users.findAll();

       // Promise.all

   // },
};

module.exports = controladorUsuario;


