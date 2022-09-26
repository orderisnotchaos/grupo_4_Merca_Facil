module.exports  = (sequelize, dataTypes) => { 
let alias = "Product";
let cols = {

//const Products = sequelize.define( 'Products',{
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            //allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        price : {
            type : dataTypes.FLOAT,
           //allowNull : false
        },
        category_id : {
            type : dataTypes.INTEGER,
            foreignKey : true
            //allowNull : true
        },
        description : {
            type : dataTypes.TEXT('medium'),
            //allowNull : false
        },
        quantity : {
            type : dataTypes.INTEGER,
            //allowNull : false
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }
    let Product = sequelize.define (alias, cols, config);
    
    Product.associate = (models)=>{

        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });

        Product.belongsToMany(models.User,{
            as:"users",
            through: "product_cart",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps : false
        });
    
    }

    return Product;
}