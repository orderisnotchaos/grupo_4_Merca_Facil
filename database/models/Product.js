
module.exports  = (sequelize, dataTypes) { 

    const Products = sequelize.define( 'Products',{
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            allowNull : false
        },
        price : {
            type : dataTypes.FLOAT,
            allowNull : false
        },
        category_id : {
            type : dataTypes.INTEGER,
            allowNull : true
        },
        description : {
            tpye : dataTypes.TEXT('medium'),
            allowNull : false
        },
        quantity : {
            type : dataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        tableName : 'Products',
        timestamps : false
    });


    return Products;
}