
const fs = require('fs');
const path =require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function recordameMiddleware(req, res, next){

    if(req.cookies.recordame != undefined && req.session.user == undefined ){

        req.session.user = usersJSON.find(user => user.email === req.cookies.recordame);
    }
    next();
}

module.exports = recordameMiddleware;