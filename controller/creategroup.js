const Group=require('../model/group');
const Usergroup=require('../model/usergroups');
const uuid=require('uuid')
exports.create=(req,res)=>{
    console.log(req.body);
    let id=uuid.v4();
    let userid=req.user.id;
    let groupname=req.body.groupname;
    Group.create({id:id,groupname:groupname})
    .then(result=>{

        let groupid=result.id;
        let groupname=result.groupname;
        
        Usergroup.create({name:req.user.username,isAdmin:true,groupname:groupname,groupId:groupid,userId:userid})
        .then(result=>{
            res.json({result,name:req.user.username});
        })
        .catch(err=>{
            res.json(err);
        })

    })
    .catch(err=>{
        console.log(err);
    })

}
exports.getgroups=(req,res)=>{
    let id=req.user.id;
    Usergroup.findAll({where:{userId:id}})
    .then(response=>{
        res.json(response);
    })
    .catch(err=>{
        console.log(err);
    })
}