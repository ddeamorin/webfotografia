module.exports = function(sequelize, DataTypes){
    let alias = "Overview";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
            
        },
  
        ruta: {
            type: DataTypes.TEXT(45),
            "allowNull" : false
        },
  
        nombre: {
            type: DataTypes.TEXT(45),
            "allowNull" : false
        },
  
        descripcion: {
            type: DataTypes.TEXT(500),
            "allowNull" : true
        },

        checkindex: {
            type: DataTypes.INTEGER,
            "allowNull" : false
        },

         
        lugar: {
            type: DataTypes.TEXT(),
            "allowNull" : false
        },
  
        fecha: {
            type: DataTypes.DATE,
            "allowNull" : true
        },
  
        view: {
            type: DataTypes.STRING(45),
            "allowNull" : false
        },
        rating: {
            type: DataTypes.INTEGER,
            "allowNull" : false
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
        "tableName": "overview",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    };
  
    let Overview = sequelize.define(alias, cols, config);
    return Overview;
  }