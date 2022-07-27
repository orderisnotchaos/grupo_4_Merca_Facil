const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const cookie = require('cookie-parser');
const {check, validationResult, body} = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
 

const controladorUsuario = {

    login: (req, res) => {
        if(req.session.user != undefined){
            return res.render('logueado');
        }
        return res.render('login');
    },


    processLogin: (req, res) => {
        let errors = validationResult(req);
        //console.log(req.body);
        //console.log({errors})
        //console.log({usersJSON})
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
                    //console.log(req.session.user , "session")

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
        }
    },

    logout: (req, res) => {
        req.session.destroy();
            
            if(req.cookies.recordame){
                res.cookie('recordame','', {maxAge: -1})
            }
            res.redirect('/')
    },

    registro: (req, res) => {
        res.render (path.join(__dirname,"../views/registro.ejs"));
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {

            return res.render(path.join(__dirname,"../views/registro.ejs"), {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        return res.send('Las validaciones se pasaron y no hay errores.');

    },

    /* sugerencia perfil usuarip
    profile: (req, res) => {
        return res.render('userProfile'));
    },*/

};

module.exports = controladorUsuario;