const express = require('express')
const app = express();
app.use(express.json());
app.use("/",express.static("./website"));
app.listen(2500,(req,res)=>{
    console.log("started") /**to run the server:
    -1 make sure to add "dev" :"nodemon server.js" in package.json file under the scripts header
    -2 type in the terminal: npm run dev 
    -3 if nodemon isn't installed type in terminal npm i --save-dev nodemon to install */
})
app.post('/',(req,res)=>{
    const parcel = req.body
    if(!parcel){
        return res.status(400).send({status:'failed'})
    }
    res.status(200).send({status:'recieved'})
    console.log(parcel['parcel']);
    addDirection(parcel['parcel']);
})

//database conection//

function addDirection(direction){
    
    //connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
            host:'127.0.0.1',
            user:'root',
            password:'',
            port:'3306',
            database:'directions'
    });

    db.connect(function(err){
        //SQL command
        let sql = "INSERT INTO directions (direction) VALUES ('"+direction+"')";

        //exeucte command
        db.query(sql, function(err,result){
            
            if(err) throw err;

            //if no errors
            console.log("1 record added");
        })
    })
}