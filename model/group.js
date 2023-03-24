const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const uuid=require('uuid');

const Group=sequelize.define('group',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    groupname:{
    type:Sequelize.STRING,
    allowNull:false
    }

});


module.exports=Group

