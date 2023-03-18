const sequelize = require("../util/Database");
const messages=require("../models/message")
const User= require("../models/users")

exports.message=(async (req, res)=>{
    try{
        const message=req.body.message;
    const id= req.id;
    await messages.create({message: message, user_id: id});
    res.status(200);
    }
    catch(err)
    {
        console.log(err);
    }
    
})

exports.getAllMessage=(async(req, res)=>{
   const allMessage= await messages.findAll({
        attributes:['message'],
        include:[{
            model: User,
            attributes:['name'],
            
        }]
    })
    
    res.send(allMessage);
})