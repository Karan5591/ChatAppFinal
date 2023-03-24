const express=require('express');
//const userRoutes=require('./user')
const bodyParser=require('body-parser')
const cors=require('cors')
const sequelize=require('../util/database')
const User=require('../model/user')
const Message=require('../model/message');
//const messageRoutes=require('./routes/message');
//const createRoutes=require('./routes/creategroup')
const Group=require('../model/group')
const Usergroup=require('../model/usergroups')
const Groupmessages=require('../model/groupmessage')
//const groupmessageRoutes=require('./routes/groupmessage');
const userController=require("../controller/user")
const app=express();

app.use(cors())
app.use(bodyParser.json())
const router= express.Router();

router.post('/signup',userController.signup)
router.post('/login',userController.login)

module.exports=router;