const Sequelize= require("sequelize");
const sequelize = require("../util/Database");

const users= sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    name:{
        type: Sequelize.STRING,
        
    },
    email:{
        type: Sequelize.STRING,
        
    },
    password:{
        type: Sequelize.STRING,
       
    },
    mobile:{
        type: Sequelize.INTEGER,
       
    }
    
 });
 users.associate=(models)=>{
    users.hasMany(models.expenses)
}
 module.exports=users;


