const jwt=require('jsonwebtoken');
const User=require('../model/user');
require('dotenv').config();

exports.authenticate=(req,res,next)=>{
    try {
        const tKn=req.header('Authorization')
        console.log(tKn);
        const user=jwt.verify(tKn, 'f335e76783e2c156cfccbc5179ab50ad2ec6d96e')
        
        User.findByPk(user.id)
        .then((user) => {
            req.user=user
            next();
            
        })
    } catch (error) {
        console.log(error);
    }
}
