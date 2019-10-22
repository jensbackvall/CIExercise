const express = require("express");
const app = express();

app.listen(3030,function(err){
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
});