const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Usergroup=sequelize.define('usergroups',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
    allowNull:false
    },
    groupname:{
    type:Sequelize.STRING,
    allowNull:false
    },
    isAdmin:{
        type:Sequelize.STRING,
        allowNull:false
    }

});


module.exports=Usergroup

