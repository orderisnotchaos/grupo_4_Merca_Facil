const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const {check, validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controladorUsuario = {

    login: (req, res) => {
        return res.render('login');
    },


    processLogin: (req, res) => {
        let errors = validationResult(req);
        //console.log(req.body);
        if (errors.isEmpty()) {

            let users;
            if(usersJSON == ""){
                users = [];
            }
            else{
                users = JSON.parse(usersJSON);
            }

            let usuarioALoguearse

            for (let i = 0; i < users.length; i++){
                if (users[i].email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, users[i].password)){
                        if (req.body.password, users[i].password){
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }}
        
            if(usuarioALoguearse == undefined){
                return res.render('login', {errors: [
                    {msg: 'Credenciales invalidas'}
                ]});
            }
            req.session.usuarioLogueado = usuarioALoguearse;
            res.render('sucess');

        }else{
            return res.render ('login', {errors: errors.errors});
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