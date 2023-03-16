const express= require("express")
const userRegister=require("../Controllers/userData")
const path= require('path')

const router=express.Router();
const filepath= (path.join(__dirname, "../public"));



router.get("/", (req, res)=>{
    res.sendFile(filepath+"/login.html")
});

router.post("/signup", userRegister.RegisterUser);
router.post("/login", userRegister.Login);
module.exports=router;