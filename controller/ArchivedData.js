const Sequelize= require("sequelize")
const {Op}= require("sequelize")
const express= require("express")
const gropumessages= require("../model/groupmessage")
const arcData= require("../model/archivedData")

exports.archiveddata= async ()=>{
    const todayDate=new Date();
    const text1=todayDate.toLocaleDateString()
  await gropumessages.findAll({where:
    {createdAt:{[Op.lt]: text1},
        
}
})
  .then( async (result)=>{
    console.log(result.length);
     for(let i=0;i<result.length;i++)
     {

     
    await arcData.create({
        message:result[i].message,
        name: result[i].name,
        groupid:result[i].groupid,
        userId: result[i].userId

     })}
     })

     await gropumessages.destroy({where:
        {createdAt:{[Op.lt]: text1}}})
  }


