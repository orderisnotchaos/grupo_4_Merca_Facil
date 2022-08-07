

module.exports  = (sequelize, dataTypes) { 

    const Categories = sequelize.define( 'Categories',{
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
    },
    {
        tableName : 'Products',
        timestamps : false
    });


    return Categories;
}