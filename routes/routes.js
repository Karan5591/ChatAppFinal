const express= require("express")
const userRegister=require("../Controllers")
const router=express.Router();

router.post("/signup", userRegister.registeruser);
module.exports=router;