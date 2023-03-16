const express= require("express")
const userRegister=require("../Controllers/userData")
const path= require('path')

const router=express.Router();
const filepath= (path.join(__dirname, "../public"));



router.get("/", (req, res)=>{
    res.sendFile(filepath+"/signup.html")
});

router.post("/signup", userRegister.RegisterUser);
module.exports=router;