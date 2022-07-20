const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");
const methodOverride =  require('method-override');
const exp = require("constants");

//Ruteo
<<<<<<< HEAD
const ruteoProducto = require ('./routes/product');
const ruteoUsuario = require ('./routes/user');
const ruteoPrincipal = require ('./routes/main');
const ruteoAdmin = require ('./routes/admin');

const session = require('express-session'); 

=======
const ruteoProducto = require ('./routers/product');
const ruteoUsuario = require ('./routers/user');
const ruteoPrincipal = require ('./routers/main');
const ruteoAdmin = require ('./routers/admin');
const session = require('express-session'); 

// Registro de las paginas donde ingresan los usuarios
const logMiddlewares = require ('./middlewares/logMiddlewares');

//Ruteo
app.use('/products', ruteoProducto);
app.use('/', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);

app.use( express.static (__dirname + "\\public"));
app.use(session({secret: "Secreto"}));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));  //obtener informacion al enviar el formulario
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE 

// Registro de las paginas donde ingresan los usuarios
app.use(logMiddlewares);
>>>>>>> 9664ec7cf86d3b68cf33065988176001176ee47c

app.listen(8000,() => {
    console.log("Servidor Corriendo");
});

//Ruteo
app.use('/products', ruteoProducto);
app.use('/users', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);

app.use( express.static (__dirname + "\\public"));
app.use(session({secret: "Secreto"}));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));  //obtener informacion al enviar el formulario
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE 

// Registro de las paginas donde ingresan los usuarios
app.use(logMiddlewares);

app.listen(8000,() => {
    console.log("Servidor Corriendo");
});

app.all('*', (req, res) => {  
    res.status(404).sendFile(__dirname + "/views/404.html");
});