const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");

//Ruteo
const ruteoProducto = require ('./routers/product');
const ruteoUsuario = require ('./routers/user');
const ruteoPrincipal = require ('./routers/main');
const ruteoAdmin = require ('./routers/admin');
const exp = require("constants");

app.use( express.static (__dirname + "\\public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8000,() => {
    console.log("Servidor Corriendo");
});

//Ruteo
app.use('/product/', ruteoProducto);
app.use('/', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);

app.all('*', (req, res) => {  
    res.status(404).sendFile(__dirname + "/views/404.html");
});