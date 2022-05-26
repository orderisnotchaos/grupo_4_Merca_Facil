const express = require("Express");
const req = require("express/lib/request");
const app = express();
const path = require("path");

app.use( express.static (__dirname + "\\public"));

app.listen(8000,() => {
    console.log("servidor corriendo");
});

app.get('/', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/login', (req, res) => { 
    
    res.sendFile(__dirname + "/views/login.html");
});

app.get('/pago', (req, res) => { 
    
    res.sendFile(__dirname + "/views/checkout.html");
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

app.get('/productCart', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productCart.html");
});

app.get('/registro', (req,res) => {
    res.sendFile(__dirname + "/views/registro.html")
});

app.get('/productDetail', (req, res) => { 
    
    res.sendFile(__dirname + "/views/productDetail.html");
});

app.all('*', (req, res) => {
    res.status(404).sendFile(__dirname + "/views/404.html");
});
