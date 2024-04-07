require('dotenv').config();
const express = require("express");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const router = express.Router();
const otpModel = require("../models/otpmodel");
const userModel=require("../models/usermodel");

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("info@trial-jy7zpl93303l5vx6.mlsender.net", "Vehicle Docs 360");

router.get("/", (req, res) => {
    res.render("login", { title: 'lol' });
});

router.get("/signup", (req, res) => {
    res.render("signup", { title: "signup" });
});

router.get("/verifyotp", async (req, res) => {
    let data = req.session.userEmail;
    console.log(data);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const recipients = [new Recipient(data, "Recipient")];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("OTP verification email")
        .setHtml(`<strong>The otp for email verification is ${otp}</strong>`)
        .setText("This is the text content otp")
    await mailerSend.email.send(emailParams);

    const newOtp = await otpModel.create({
        userEmail: data,
        otp: otp
    });
    res.render("verifyotp", { title: "hehe" });
});

router.post("/otpverification",async (req,res)=>{
    const otpData=req.body.otp;
    const sessionEmail=req.session.userEmail;
    try{
        const user=await otpModel.findOne({userEmail:sessionEmail,otp:otpData});
        if(user){
            console.log("User Verified");
            const updateStatus=await userModel.findOneAndUpdate({_id:req.session.useridentity},{validUser:true},{new:true});
            res.redirect("/home");
        }else{
            console.log("User not exists");
        }
    }catch(error){
        console.error(error);
        throw error;
    }
});

router.get("/home",(req,res)=>{
    res.render("home",{title:"home"});
});

router.get("/error",(req,res)=>{
    let data={
        message:req.query.message
    }
    res.render("error",data);
});

module.exports = router;
