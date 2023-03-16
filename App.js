const express= require("express");
const bodyParser=require("body-parser");
const routes= require("./routes/routes")
const { urlencoded } = require("body-parser");
const cors= require("cors")

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname+"/public"));


app.use("/", routes);
app.listen((3000), (req, res)=>{
    console.log("Server Started")
});