const express = require("express");
const req = require("express/lib/request");
const app = express();

app.use(express.urlencoded({ extended: false }));  //obtener informacion al enviar el formulario

const path = require("path");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//Ruteo
const ruteoProducto = require ('./routers/product');
const ruteoUsuario = require ('./routers/user');
const ruteoPrincipal = require ('./routers/main');
const ruteoAdmin = require ('./routers/admin');

// Registro de las paginas donde ingresan los usuarios
const logMiddlewares = require ('./middlewares/logMiddlewares');


const exp = require("constants");

app.use( express.static (__dirname + "\\public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// Registro de las paginas donde ingresan los usuarios
app.use(logMiddlewares);


app.listen(8000,() => {
    console.log("Servidor Corriendo");
});

//Ruteo
app.use('/products', ruteoProducto);
app.use('/', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);

app.all('*', (req, res) => {  
    res.status(404).sendFile(__dirname + "/views/404.html");
});