const express=require('express');
const app=express()
const userRoutes=require('./routes/user')
const bodyParser=require('body-parser')
const cors=require('cors')
const sequelize=require('./util/database')
const User=require('./model/user')
const Message=require('./model/message');
const messageRoutes=require('./routes/message');
const createRoutes=require('./routes/creategroup')
const Group=require('./model/group')
const Usergroup=require('./model/usergroups')
const Groupmessages=require('./model/groupmessage')
const groupmessageRoutes=require('./routes/groupmessage');
const router = require('./routes/allRoutes');
const path=require("path")





app.use(express.static("Views"));
app.use(cors())
app.use(bodyParser.json())
app.use(userRoutes)
app.use(messageRoutes);
app.use(createRoutes);
app.use(groupmessageRoutes);


User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});

User.hasMany(Groupmessages);
Groupmessages.belongsTo(User)

const PORT=process.env.PORT || 4000;
const http=require('http').createServer(app)
http.listen(PORT, (req, res)=>{
    console.log("server started");
});

//Socket


const io=require('socket.io')(http)
io.on('connection', (socket)=>{
    console.log("connected");
    socket.on('message', (msg)=>{
       socket.broadcast.emit('message', msg);
    })
})