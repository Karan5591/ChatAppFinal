const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth');
const createController=require('../controller/creategroup')

router.post('/creategroup',auth.authenticate,createController.create)
router.get('/getgroups',auth.authenticate,createController.getgroups)

module.exports=router