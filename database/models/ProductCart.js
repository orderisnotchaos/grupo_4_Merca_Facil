module.exports  = (sequelize, dataTypes) => { 
    let alias = "ProductCart";
    let cols = {

        product_id : {
            type : dataTypes.INTEGER,
            foreignKey: true,
            primaryKey : true,
            allowNull : false
        },
        user_id : {
            type : dataTypes.INTEGER,
            foreignKey : true,
            primaryKey : true,
            allowNull : false
        },
        quantity : {
            type : dataTypes.INTEGER,
            allowNull : false
        },

    }

    let config = {
        tableName: "product_cart",
        timestamps: false
    }
    let ProductCart = sequelize.define (alias, cols, config);
    

    return ProductCart;
}