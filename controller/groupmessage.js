const Group=require('../model/group')
const Groupmessage=require('../model/groupmessage')
const Usergroup=require('../model/usergroups');
const User=require('../model/user')
exports.getmessages=async (req,res)=>{
    console.log(req.body);
    console.log(req.params.id);

    const message=req.body.message

    const available=Group.findOne({where:{id:req.params.id}})

    if(available){
        Groupmessage.create({
            message:message,
            name:req.user.username,
            groupid:req.params.id,
            userId:req.user.id
        })
        .then((result) => {
           console.log({sucess:true}); 
           res.json({result,sucess:true})
        }).catch((err) => {
            console.log(err);
        });
    }

}

exports.getgroupmessages=async (req,res)=>{
let grpidid=req.params.id;
let uidid=req.user.id;
let found = await Usergroup.findOne({
  where: { groupId: grpidid, }
});

if(found){
    Groupmessage.findAll({where:{groupid:grpidid}})
    .then(result=>{
        res.json({messages:result,uid:req.user.id});
    })
    .catch(err=>{
        res.json(err);
    })
}
else{
    res.json("something went wrong")

}

}

exports.getgroupmembers=(req,res)=>{
    console.log(req.params.id);
    const id=req.params.id;
    Usergroup.findAll({where:{groupid:id}})
    .then(response=>{
        res.json({result:response,sucess:true})
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.addparticipants=async (req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    const id=req.params.id;
    const email=req.body.email;
    const option=req.body.option
    const admin=await Usergroup.findOne({where:{groupid:req.params.id,userId:req.user.id}});
    console.log(admin.isAdmin);
    if(admin.isAdmin){
        let usercheck=await User.findOne({where:{email:email}});

if(usercheck){

let groupdata=await Group.findOne({where:{id:id}});
let grpName=groupdata.groupname;
let grpid=groupdata.id;
let uname=usercheck.username;

Usergroup.create({name:uname,groupname:grpName,isAdmin:option,userId:usercheck.id,groupId:grpid})
.then(result=>{
    res.json("user added to group")
})
.catch(err=>{
    console.log(err);
    res.json("something went wrong");
})

}
else{
    res.json("user not found with that email")
}

}
else{

    res.json("youre not admin or group doesn't exist")
}
    
}

exports.admin=async (req,res)=>{
    const groupId=req.params.id;
  let userId = req.user.id;
  const userupdatedid = req.body.userId;

  let checkad = await Usergroup.findOne({
    where: { groupId: groupId, userId: userId},
  });

  if (checkad.isAdmin == true ||checkad.isAdmin=='true') {
    Usergroup.update(
      { isAdmin: true },
      { where: { userId: userupdatedid, groupId: groupId } }
    )
      .then((result) => {
        res.json("user made as group admin");
      })
      .catch((err) => {
        res.json("something went wrong");
      });
  } else {
    res.json("you are not admin !ask admin to make you admin");
  }
}

exports.remove=async (req,res)=>{
    const groupId=req.params.id;
  let userId = req.user.id;
  const userupdatedid = req.body.userId;

  let checkad = await Usergroup.findOne({
    where: { groupId: groupId, userId: userId},
  });

  if (checkad.isAdmin == true ||checkad.isAdmin=='true') {
    Usergroup.destroy(
      { where: { userId: userupdatedid, groupId: groupId } }
    )
      .then((result) => {
        res.json("user remove from the group");
      })
      .catch((err) => {
        res.json("something went wrong");
      });
  } else {
    res.json("you are not admin !ask admin to make you admin");
  }
}