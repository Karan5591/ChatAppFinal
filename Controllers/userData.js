const bcrypt= require("bcrypt")
const User= require("../models/users")
const jwt=require("jsonwebtoken")
const dotenv= require("dotenv");
const sequelize = require("../util/Database");
dotenv.config();


exports.RegisterUser=(async(req, res)=>{
    try
    {
      
        const name= req.body.name;
        const email= req.body.email;
        const mobile= req.body.mobile;
        const password= req.body.password;
        
        const hashPassword=  await bcrypt.hash(password, 10)
        const emailCheck= await User.findOne({where:{ email: req.body.email}});
           
           if(emailCheck)
           {
            res.send("Email Already Exist");
           }
           else
           {
            await User.create({name: name, email: email, password: hashPassword, mobile: mobile});
           
            res.send("Registered Successfully");
           }
        }
    catch (err)
    {
        console.log(err);
    }
    
});

exports.Login=(async (req, res)=>{

    try
       {
           const emailCheck=await User.findOne({where:{email: req.body.email}})
           if(!emailCheck)
           {
                res.status(404).send("User not found");
           }
            else if(!await bcrypt.compare(req.body.password, emailCheck.password))
           {
               res.status(401).send("User not authorized");
           }
           else
           {
               const token = jwt.sign(
                   { user_id: emailCheck.id },
                   process.env.JWT_SECRET,
                   {
                     expiresIn: "1h",
                   }
                 );
                 res.cookie("jwtoken", token).send(emailCheck.name);
           }
       }
       catch (err)
       {
           console.log(err);
       }
      
});

