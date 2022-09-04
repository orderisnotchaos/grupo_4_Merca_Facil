
module.exports = (sequelize, dataTypes) => {
let alias = "User";
let cols = {

        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER,
           //allowNull : false
        },
        firstName : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        lastName : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        email : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        password : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        isAdmin : {
           type : dataTypes.INTEGER,
            //allowNull : false
        },
        avatar : {
            type : dataTypes.STRING,
            //allowNull : false
        },
        address : {
            type : dataTypes.STRING,
            //allowNull : true
        },
        phone : {
            type : dataTypes.STRING,
            //allowNull : true
        }
    }

    let config = {
        tableName:"users",
        timestamps: false
    }

    let User = sequelize.define (alias, cols, config);

    return User;

}