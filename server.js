const express = require('express')
const app = express();
app.use(express.json());
app.use("/",express.static("./website"));
app.listen(2500,(req,res)=>{
    console.log("started") /**to run server type in the terminal: npm run dev */
})
app.post('/',(req,res)=>{
    const parcel = req.body
    if(!parcel){
        return res.status(400).send({status:'failed'})
    }
    res.status(200).send({status:'recieved'})
    console.log(parcel['parcel']);
})