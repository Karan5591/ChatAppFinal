const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');


exports.signup=async (req,res)=>{
    console.log(req.body);
    const { username, email,phone,password }=req.body
    console.log(req.body)
    const user=await User.findOne({where:{email:email}})
    
    if(username=='' || email=='' || phone=='' || password==''){
        return res.status(400).json({msg:'Something is missing'})
    }
    if(user!==null){
        return res.status(403).json({msg:'User already exists'})
    }
    bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                console.log(err);
                res.status(400).json({msg:'Something Went Wrong'})
            }else{
                await User.create({
                    username:username,
                    email:email,
                    phone:phone,
                    password:hash
                })
                res.status(201).json({sucess:true,msg:'User registered successfully... Login Now?'})
            }

        })
    
}

exports.login=async (req,res)=>{
console.log(req.body);
const {email,password}=req.body;
 if(email.length<=0||email===''||password.length<=0||password===''){
        return res.status(403).json({msg:'email or password are wrong'})
    }
    else{
        User.findAll({where:{email:email}})
        .then(result=>{
            console.log(result==0)
            if(result==0){
                return res.status(404).json({msg:'User not found'})
            }
            if(result[0].email==email){
            console.log(result[0].password);
            bcrypt.compare(password,result[0].password,(err,results)=>{
                 if(results==true){
                res.status(200).json({msg:'User login sucessfully',token:jwt.sign({id:result[0].id},'f335e76783e2c156cfccbc5179ab50ad2ec6d96e')})
            }
            else{
                res.status(401).json({msg:'User not authorized'})
            }

            })
           
             }
        })
    }
}