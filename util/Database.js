const Sequelize=require('sequelize')
const sequelize=new Sequelize('group_chat_app','root','Password@4321',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;