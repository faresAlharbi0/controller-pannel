const express = require('express')
const app = express();
app.use(express.json());
app.use("/",express.static("./website"));
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage});
const spawner = require('child_process').spawn
app.listen(2500,(req,res)=>{
    console.log("started") /**to run the server:
    -1 make sure to add "dev" :"nodemon server.js" in package.json file under the scripts header
    -2 type in the terminal: npm run dev 
    -3 if nodemon isn't installed type in terminal npm i --save-dev nodemon to install */
})
app.post('/upload', upload.single('audio'), (req, res) => {
    // The uploaded file is available as req.file
    if (!req.file) {
        return res.status(400).json({ error: 'No audio file uploaded.' });
    }
    var process = spawner('python3',["./python/VR.py","read"]);
    process.stdout.on('data',(data) =>{
        return res.status(200).json(data.toString());
    })

    // Process the uploaded file (e.g., save it to a specific location)
    // ...
});
app.get('/retrive',(req,res)=>{
    retriveResult(function(err,data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            obj = JSON.parse(data);
            console.log(obj[0].direction);
            res.status(200).send("<h1>"+obj[0].direction+"</h1>")
        }    
    })
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
const mysql = require("mysql2");
function retriveResult(callback){
    let db = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'root',
        port:'3306',
        database:'directions'
});

db.connect(function(err){
    //SQL command
    let sql = "SELECT direction FROM `directions` ORDER BY id DESC LIMIT 1";

    //exeucte command
    db.query(sql, function(err,result){
        
        if(err) callback(err,null);

        //if no errors
        callback(null,JSON.stringify(result));
    })
})


}
function addDirection(direction){

    //connection
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