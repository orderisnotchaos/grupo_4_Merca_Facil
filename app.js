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
    
    res.sendFile(__dirname + "/views/login.html");
});



app.get('/sobrenosotros', (req, res) => { 
    
    res.sendFile(__dirname + "/views/sobrenosotros.html");
});

app.get('/mispedidos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/mispedidos.html");
});

app.get('/contacto', (req, res) => { 
    
    res.sendFile(__dirname + "/views/contacto.html");
});

app.get('/productos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productos.html");
});

app.get('/404', (req, res) => { 
    
    res.sendFile(__dirname + "/views/404.html");
});

app.get('/registro', (req,res) => {

    res.sendFile(__dirname + "/views/registro.html")
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