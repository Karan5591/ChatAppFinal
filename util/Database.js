const Sequelize=require('sequelize')
const dotenv=require('dotenv')
dotenv.config();
const sequelize=new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;