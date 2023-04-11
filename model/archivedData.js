const Sequelize= require("sequelize")
const util= require("../util/database")
const dotenv= require("dotenv")
dotenv.config();

const archData= util.define('archivedData',{
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
    },
    userId:{
        type:Sequelize.STRING,
        allowNull:false
   }

},
{
    timestamps: false,
})
module.exports=archData;
