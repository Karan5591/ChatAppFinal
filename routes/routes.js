const express= require("express")
const userRegister=require("../Controllers/userData")
const messageData= require("../Controllers/Messages")
const auth=require('../Middleware/auth')
const path= require('path')

const router=express.Router();
const filepath= (path.join(__dirname, "../public"));



router.get("/", (req, res)=>{
    res.sendFile(filepath+"/login.html")
});

router.post("/signup", userRegister.RegisterUser);
router.post("/login", userRegister.Login);
router.post("/message", auth, messageData.message);
module.exports=router;