const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Groupmessage=sequelize.define('groupmessage',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    groupid:{
         type:Sequelize.STRING,
         allowNull:false
    }
})

module.exports=Groupmessage;