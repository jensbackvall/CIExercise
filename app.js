const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

const purchase = require('./classes/purchase');
const thisPurchase = new purchase(false, 0, [], 0);

app.listen(3030,function(err){
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/public/html/index.html")
});

app.post('/checkbox-value', (req, res) => {
    const itc = req.body.internetconnection;
    thisPurchase.setInternetConnection(itc)
    console.log("Internet Connection has the value: ", itc);
    console.log("Internet Connection has the value: ", req.body);
    res.send({ "status": 200, "totalprice": thisPurchase.totalPrice });
});

app.post('/addphoneline', (req, res) => {
    const itc = req.body.internetconnection;
    thisPurchase.addPhoneLine();
    console.log("Added a phone line");
    res.send({ "status": 200, "totalprice": thisPurchase.totalPrice });
});

app.post('/subtractphoneline', (req, res) => {
    const itc = req.body.internetconnection;
    thisPurchase.subtractPhoneLine();
    console.log("Subtracted a phone line");
    res.send({ "status": 200, "totalprice": thisPurchase.totalPrice });
});

console.log("Logging for change :-)");