const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");
const methodOverride =  require('method-override');
const exp = require("constants");
const helmet = require('helmet');


//app.use(helmet());

//Ruteo
const ruteoProducto = require ('./routes/product');
const ruteoUsuario = require ('./routes/user');
const ruteoPrincipal = require ('./routes/main');
const ruteoAdmin = require ('./routes/admin');
const session = require('express-session'); 

// Registro de las paginas donde ingresan los usuarios
const logMiddlewares = require ('./middlewares/logMiddlewares');

app.use(express.urlencoded({ extended: true }));  //obtener informacion al enviar el formulario
app.use(express.json());

app.use( express.static (__dirname + "\\public"));
app.use(session({secret: "Secreto", 
                resave: true,
                saveUninitialized: true
                }));
app.set('view engine', 'ejs');

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE 

// Registro de las paginas donde ingresan los usuarios
app.use(logMiddlewares);

//Ruteo
app.use('/products', ruteoProducto);
app.use('/', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);
app.listen(8000,() => {
    console.log("Servidor Corriendo");
});
