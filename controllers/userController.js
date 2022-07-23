const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const {check, validationResult, body} = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
 

const controladorUsuario = {

    login: (req, res) => {
        return res.render('login');
    },


    processLogin: (req, res) => {
        let errors = validationResult(req);
        //console.log(req.body);
        //console.log({errors})
        //console.log({usersJSON})
        if(errors.isEmpty()){

            usuarioAlogear = usersJSON.find(user => user.email === req.body.email);
            console.log(usuarioAlogear.password);
            if( usuarioAlogear == undefined ){
                res.render('login',{logueoInvalido:'usuario o contraseña inválidos'});
            }else{

                console.log('entre');
                if(usuarioAlogear.password === req.body.password ){
                    req.session.user ={
                        ...req.body,
                        userType: usuarioAlogear.userType
                    }
                    //console.log(req.session.user , "session")
                    res.render('index');
                }else{
                    res.render('login', {logueoInvalido:'usuario o contraseña inválidos'})
                }
            }
        }else{
            res.render('login',{errors:errors.array()});
        }
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

        return res.send ('Las validaciones se pasaron y no hay errores.')

    },

    /* sugerencia perfil usuarip
    profile: (req, res) => {
        return res.render('userProfile'));
    },*/

};

module.exports = controladorUsuario;