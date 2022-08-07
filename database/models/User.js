
module.exports = (sequelize, dataTypes) => {

    const User = sequelize.define('Users', {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER,
            allowNull : false
        },
        firstName : {
            type : dataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type : dataTypes.STRING,
            allowNull : false
        },
        email : {
            type : dataTypes.STRING,
            allowNull : false
        },
        password : {
            type : dataTypes.STRING,
            allowNull : false
        },
        isAdmin : {
            type : dataTypes.BOOLEAN,
            allowNull : false
        },
        avatar : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        address : {
            type : dataTypes.STRING,
            allowNull : true
        },
        phone : {
            type : dataTypes.STRING,
            allowNull : true
        }
    },
    {
        tableName : 'Users',
        timestamps : false
    });


    return User;
};