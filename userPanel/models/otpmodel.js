require('dotenv').config();
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(() => {
    console.log("Admin otp Model successfully connected");
}).catch((err) => {
    console.log(`Error occured ${err}`);
});

const otpSchema = new mongoose.Schema({
    AdminEmail: {
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