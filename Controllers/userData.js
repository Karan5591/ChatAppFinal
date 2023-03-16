const bcrypt= require("bcrypt")
const User= require("../models/users")


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