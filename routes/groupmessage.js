const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/auth');
const groupmessageController=require('../controller/groupmessage')




router.post(`/groupmessage/:id`,authenticate.authenticate,groupmessageController.getmessages)
router.get('/gropumessages/:id',authenticate.authenticate,groupmessageController.getgroupmessages)
router.get('/getmembers/:id',authenticate.authenticate,groupmessageController.getgroupmembers)
router.post('/addparticipants/:id',authenticate.authenticate,groupmessageController.addparticipants)
router.post('/admin/:id',authenticate.authenticate,groupmessageController.admin);
router.post('/remove/:id',authenticate.authenticate,groupmessageController.remove);


const AWS= require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');
AWS.config.update({
    accessKeyId: process.env.SECRET_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: "ap-south-1"
})
const BUCKET = process.env.BUCKET
const s3 = new AWS.S3();

const upload = multer({
    
    storage: multerS3({
        s3: s3,
       // acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
           
            cb(null, (file.originalname))
        }
    })
})

router.post('/upload',upload.single('image'), groupmessageController.addFile);
router.get("/download/:filename",groupmessageController.downloadFile)



module.exports=router;
