const fs = require('fs');
const path =require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let db= require ("../database/models");
<<<<<<< HEAD

=======
>>>>>>> a7dac7357e236826bcd710fb098e940f21dcfd87
function recordameMiddleware(req, res, next){
    if(req.cookies.recordame != undefined && req.session.user == undefined ){
<<<<<<< HEAD
        
        db.User.findOne({
            where: {email: req.cookies.recordame}
        }).then((user) =>{
            
=======
        db.User.findOne({
            where: {email: req.cookies.recordame}
        }).then((user) =>{
>>>>>>> a7dac7357e236826bcd710fb098e940f21dcfd87
                req.session.user = user;
        });
    }
    next();
}
module.exports = recordameMiddleware;