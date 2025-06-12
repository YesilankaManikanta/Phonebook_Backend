const mongoose = require('mongoose');
const express = require('express');
const PhoneBook = require('./modal/dataSchema');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors())

// database connection 

async function connectToDatabase() {
    try {
    await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.log("Some error happened while connecting database", error);
    }
}
connectToDatabase();

// post request 

app.post("/addPhone",(req,res)=>{
    const details = req.body
    PhoneBook.create(details)
    .then((data)=>{
        console.log(data);
        res.send(data)
    })
    .catch((err)=>{
        console.log(err);
    })
})

// get request 

app.get("/numbers",(req,res)=>{
    PhoneBook.find()
    .then((data)=>{
        res.status(201).send(data)
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

// delete request 

app.delete("/deletePhone/:id",(req,res)=>{
    PhoneBook.deleteOne({_id:req.params.id})
    .then((data)=>{
        console.log(data)
        res.send({message:"the number successfully deleted"})
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

// updatedata 

app.put("/updatePhone/:id",(req,res)=>{
    const data =req.body
    PhoneBook.findByIdAndUpdate(req.params.id,data)
    .then((data)=>{
        console.log(data)
        res.send({message:"the number successfully updated"})
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running");
})