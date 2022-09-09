
const fs = require('fs');
const path =require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let db= require ("../database/models");

function recordameMiddleware(req, res, next){

    if(req.cookies.recordame != undefined && req.session.user == undefined ){
        
        db.User.findOne({
            where: {email: req.cookies.recordame}
        }).then((user) =>{
            
                req.session.user = user;
        });
    }
    next();
}

module.exports = recordameMiddleware;