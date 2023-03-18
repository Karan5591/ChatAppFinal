const Sequelize= require("sequelize");
const sequelize = require("../util/Database");

const message= sequelize.define("message",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    message:{
        type: Sequelize.STRING,
        
    },
    user_id:{
        type: Sequelize.INTEGER,
        
    }
    
    
 });
 
 module.exports=message;


