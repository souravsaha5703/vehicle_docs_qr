const mongoose = require("mongoose");
const express = require("express");

const connection = mongoose.connect("mongodb+srv://saha83787:fMTsLWy3RzqLn8JA@cluster0.cctst9d.mongodb.net/?retryWrites=true&w=majority");

connection.then(() => {
    console.log("Database successfully connected");
}).catch((err) => {
    console.log(`Error occured ${err}`);
});

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Set expiration time to 5 minutes (300 seconds)
    }
});

module.exports=mongoose.model("OTP",otpSchema);