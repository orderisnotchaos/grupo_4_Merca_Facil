const res = require('express/lib/response');
const path = require('path'); 
const fs = require('fs');
const {check, validationResult, validatonResult, body} = require('express-validator');
const bcrypt = require('bcrypt');



const controladorUsuario = {

    login: (req, res) => {
        return res.render ('login');
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('users.json', {encoding: 'utf-8'});
            let users;
            if(usersJSON == ""){
                users = [];
            }else{
                users = JSON.parse(usersJSON);
            }

            for (let i = 0; i < users.length; i++){
                if (users[i].email == req.body.email){
                    //if (bcrypt.compareSync(req.body.password, users[i].password)){
                        if (req.body.password, users[i].password){
                        let usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if(usuarioALoguearse == undefined){
                return res.render ('login', {errors: [
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
        const resultValidation = validatonResult(req);
        return res.send(resultValidation);
    },

    /* sugerencia perfil usuarip
    profile: (req, res) => {
        return res.render('userProfile'));
    },*/

};

module.exports = controladorUsuario;