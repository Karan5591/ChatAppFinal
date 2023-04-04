const Message=require('../model/message');

exports.message=(req,res)=>{
    try{
    console.log(req.body);
    console.log(req.params);
    console.log(req.user);
    const { message }=req.body
    Message.create({
        message:message,
        name:req.user.username,
        userId:req.user.id
    })
    res.status(201).json({sucess:true})
}
catch(err){
    res.status(500).json({sucess:false});
}
    
}

exports.getmessages=(req,res)=>{
    try{
    Message.findAll().then((result) => {
        res.status(200).json({sucess:true,messages:result,uid:req.user.id})
    }).catch((err) => {
        console.log(err);
    });
}
catch(err){
    res.status(500).json({sucess:false,err})
}
    
}

exports.getAllmessages=(req,res)=>{
    try{
    Message.findAll().then((result) => {
        res.status(200).json({sucess:true,messages:result,uid:req.user.id})
    }).catch((err) => {
        console.log(err);
    });
}
catch(err){
    res.status(500).json({sucess:false,err})
}
}