const sequelize = require("../util/Database");
const messages=require("../models/message")

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