// Registro de las paginas donde ingresan los usuarios
// Ver log.txt

const fs = require('fs');
const fecha = new Date();

function logMiddlewares (req, res, next){
    fs.appendFileSync ('logMiddlewares.txt', 'Se ingresa en la Página ' + req.url + ' ***El día ' + fecha + "\n" );
    next();    
}

module.exports = logMiddlewares;
