const express= require("express");
const bodyParser=require("body-parser");
const routes= require("./routes/routes")
const { urlencoded } = require("body-parser");
const users= require("./models/users")
const message= require("./models/message")


const cookieParser= require("cookie-parser")
const cors= require("cors")


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname+"/public"));

app.use(cookieParser())

users.hasMany(message, {
    foreignKey: 'user_id',
   
});
message.belongsTo(users, {
    foreignKey: 'user_id',
    
    
})

app.use("/", routes);
app.listen((3000), (req, res)=>{
    console.log("Server Started")
});