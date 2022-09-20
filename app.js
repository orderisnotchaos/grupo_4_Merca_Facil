const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");
const methodOverride =  require('method-override');
const exp = require("constants");
const helmet = require('helmet');
const recordameMiddleware = require('./middlewares/recordameMiddleware');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');


//Ruteo
const ruteoProducto = require ('./routes/product');
const ruteoUsuario = require ('./routes/user');
const ruteoPrincipal = require ('./routes/main');
const ruteoAdmin = require ('./routes/admin');
const session = require('express-session');
const ruteoAPI = require ('./routes/API');  


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use( express.static (__dirname + "\\public"));
app.use(session({secret: "Secreto", 
                resave: true,
                saveUninitialized: true
                }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(recordameMiddleware);

//Ruteo
app.use('/products', ruteoProducto);
app.use('/users', ruteoUsuario);
app.use('/', ruteoPrincipal);
app.use('/', ruteoAdmin);
app.use('/api',ruteoAPI);
app.listen(8000,() => {
    console.log("Servidor Corriendo");
});
