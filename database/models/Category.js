module.exports  = (sequelize, dataTypes) => { 
let alias = "Category";
let cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false
    }
    let Category = sequelize.define (alias, cols, config);

    Category.asssociate = (models)=>{
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    }

    return Category;
}