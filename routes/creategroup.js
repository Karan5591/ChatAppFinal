const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/auth');
const createController=require('../controller/creategroup')

router.post('/creategroup',authenticate.authenticate,createController.create)
router.get('/getgroups',authenticate.authenticate,createController.getgroups)

module.exports=router