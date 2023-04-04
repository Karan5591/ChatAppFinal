const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/auth');
const messageController=require('../controller/message')

router.post('/message',authenticate.authenticate,messageController.message)
router.get('/getmessages/:id',authenticate.authenticate,messageController.getmessages)
router.get('/getAllmessages',authenticate.authenticate,messageController.getAllmessages)




module.exports=router