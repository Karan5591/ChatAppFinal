

const sequelize= require("../util/Database")
const users= require("./users")
sequelize
.sync()
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
})
