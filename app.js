const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");

//Ruteo Karen - product.js
const ruteoProducto = require ('./routers/product');

app.use( express.static (__dirname + "\\public"));

app.set('view engine', 'ejs');


app.listen(8000,() => {

    console.log("servidor corriendo");
});


app.get('/', (req, res) => { 

    res.render(__dirname + "/views/index.ejs");
});

app.get('/login', (req, res) => { 
    
    res.sendFile(__dirname + "/views/login.ejs");
});



app.get('/sobrenosotros', (req, res) => { 
    
    res.sendFile(__dirname + "/views/sobrenosotros.ejs");
});

app.get('/mispedidos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/mispedidos.ejs");
});

app.get('/contacto', (req, res) => { 
    
    res.render(__dirname + "/views/contacto.ejs");
});

app.get('/productos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productos.ejs");
});

app.get('/404', (req, res) => { 
    
    res.sendFile(__dirname + "/views/404.ejs");
});

app.get('/registro', (req,res) => {

    res.sendFile(__dirname + "/views/registro.ejs")
});

/*app.get('/pago', (req, res) => { 
    
    res.sendFile(__dirname + "/views/checkout.html");
});*/

/*app.get('/productCart', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productCart.html");
});*/

/*app.get('/productDetail', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productDetail.html");
});*/

//Ruteo Karen - product.js
app.use('/', ruteoProducto);





app.all('*', (req, res) => {
    
    res.status(404).sendFile(__dirname + "/views/404.html");
});