const path = require('path');

const controladorProducto = {
    /*Ruteo Karen - productCart & productDetail*/
    productCart: (req, res) =>{
        res.sendFile (path.join(__dirname,"../views/productCart.html"));
    },

    productDetail: (req, res) =>{
        res.sendFile (path.join(__dirname,"../views/productDetail.html"));
    },

};

module.exports = controladorProducto;