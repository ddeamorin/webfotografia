module.exports = function(sequelize, DataTypes){
    let alias = "Admin";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
            
        },
  
        email: {
            type: DataTypes.TEXT(45),
            "allowNull" : false
        },
  
        contrasena: {
            type: DataTypes.CHAR(60),
            "allowNull" : false
        },
        cookie_hash: {
            type: DataTypes.CHAR(60),
            "allowNull" : true
        },
        
        created_at: {
            type: DataTypes.DATE,
            "allowNull" : false
        },
  
        updated_at:{
            type: DataTypes.DATE,
            "allowNull" : false
        }
    };
  
    let config = {
        "tableName": "admin",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    };
  
    let Admin = sequelize.define(alias, cols, config);
    return Admin;
  }