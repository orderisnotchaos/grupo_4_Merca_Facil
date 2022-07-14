const res = require('express/lib/response');
const path = require('path');

const controladorUsuario = {

    login: (req, res) =>{
        res.render (path.join(__dirname,"../views/login.ejs"));
    },

    registro: (req, res) =>{
        res.render (path.join(__dirname,"../views/registro.ejs"));
    }

};


/*IMPLEMENTAR REGISTRO DE USUARIOS YURIANA NOTAS

*SUBIDA FOTO DE PERFIL
*CONTRASENA
*ENCRIPTAR CONTRASENA
*GUARDAR DATOS EN VIADOS EN JASON DE USUARIOS

1. products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado*/

module.exports = controladorUsuario;