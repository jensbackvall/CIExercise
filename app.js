const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

const purchase = require('./classes/purchase');

app.listen(3030,function(err){
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/public/html/index.html")
});