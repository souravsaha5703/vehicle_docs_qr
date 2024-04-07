require('dotenv').config();
const mongoose=require("mongoose");
const express=require("express");

const connection=mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(()=>{
    console.log("Database successfully connected");
}).catch((err)=>{
    console.log(`Error occured ${err}`);
});

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phoneno:{
        type:String,
        required:true,
        unique: true
    },
    validUser:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('User',userSchema);