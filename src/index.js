const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
const data=require('./data');

let recoveredPatients = 0;
for(let i=0 ; i<data.length ; i++){
    recoveredPatients +=data[i].recovered;
}

app.get('/totalRecovered',(req,res)=>{   
    let obj={data:{_id: "total", recovered:recoveredPatients}};
    res.send(obj);
})





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;