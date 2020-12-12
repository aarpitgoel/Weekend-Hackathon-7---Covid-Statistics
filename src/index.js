const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
const data=require('./data');

let ob = data;
let recoveredPatients = 0;
let totalActiveCases = 0;
let totalDeaths = 0;
//let totalHotspotStates = 0;
//console.log(ob.data.length);

for(let i=0 ; i<ob.data.length ; i++){
    //console.log("in");
    recoveredPatients += ob.data[i].recovered;
    totalActiveCases += (ob.data[i].infected - ob.data[i].recovered);
    totalDeaths += ob.data[i].death;
}

//console.log(recoveredPatients);

app.get('/totalRecovered',(req,res)=>{   
    let obj={data:{_id: "total", recovered: recoveredPatients}};
    res.send(obj);
})

app.get('/totalActive' , (req,res) => {
    let obj = {data: {_id: "total", active:totalActiveCases}};
    res.send(obj);
})

app.get('/totalDeath' , (req,res) => {
    let obj = {data: {_id:"total", death:totalDeaths}};
    res.send(obj);
})





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;