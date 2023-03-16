const express= require("express");
const bodyParser=require("body-parser");
const routes= require("./routes/routes")
const { urlencoded } = require("body-parser");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/", routes);
app.listen((3000), (req, res)=>{
    console.log("Server Started")
});