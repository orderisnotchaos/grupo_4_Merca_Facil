const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");

//Ruteo
const ruteoProducto = require ('./routers/product');
const ruteoUsuario = require ('./routers/user');
const ruteoPrincipal = require ('./routers/main');
const ruteoAdmin = require ('./routers/admin');

app.use( express.static (__dirname + "\\public"));

app.set('view engine', 'ejs');

app.listen(8000,() => {
    console.log("Servidor Corriendo");
});

app.get('/', (req, res) => { 
    res.render(__dirname + "/views/index.ejs");
});

app.get('/404', (req, res) => { 
    res.sendFile(__dirname + "/views/404.ejs");
});

//TENGO DUDAS DE ESTO
/*app.get('/productos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productos.ejs");
});*/

//Ruteo
app.use('/', ruteoProducto);
app.use('/', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);

app.all('*', (req, res) => {  
    res.status(404).sendFile(__dirname + "/views/404.html");
});