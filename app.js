const express = require("Express");
const app = express();
const path = require("path");
console.log(__dirname + "\\public");
app.use( express.static (__dirname + "\\public"));

app.listen(8000,() => {
    console.log("servidor corriendo");
});

app.get('/', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/tienda', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/home', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/contactanos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/productos', (req, res) => { 
    
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/404', (req, res) => { 
    
    res.sendFile(__dirname + "/views/404.html");
});

app.all('*', (req, res) => {
    res.status(404).sendFile(__dirname + "/views/404.html");
});