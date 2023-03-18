

const sequelize= require("../util/Database")
const users= require("./users")
const message= require("./message")


users.hasMany(message, {
    foreignKey: 'user_id',
   
});
message.belongsTo(users, {
    foreignKey: 'user_id',
    
    
})

sequelize
.sync()
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
})

