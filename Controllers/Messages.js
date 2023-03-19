const sequelize = require("../util/Database");
const messages=require("../models/message")
const User= require("../models/users")
const { Op } = require("sequelize");

exports.message=(async (req, res)=>{
    try{
        const message=req.body.message;
        
    const id= req.id;
    await messages.create({message: message, user_id: id});
    const largeId=await messages.findAll({
        attributes: [sequelize.fn('MAX', sequelize.col('id'))],
        raw: true
    })
    
    res.send(largeId);
    }
    catch(err)
    {
        console.log(err);
    }
    
})

exports.getAllMessage=(async(req, res)=>{
    const chkId=req.query.ids;
    console.log(chkId);
   const allMessage= await messages.findAll({
        attributes:['id','message'],
        include:[{
            model: User,
            attributes:['name'],
            
        }],
        where: {
            id: {
              [Op.gte]: chkId 
            }
          }
        
    })
    
    res.send(allMessage);
})