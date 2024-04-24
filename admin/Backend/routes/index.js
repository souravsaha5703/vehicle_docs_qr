const express=require('express');
const adminSchema=require("../models/adminModel");
const adminotpSchema=require("../models/adminotpModel");
const bcrypt=require('bcrypt');
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const router=express.Router();

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("info@trial-jy7zpl93303l5vx6.mlsender.net", "Vehicle Docs 360");

router.get('/',(req,res)=>{
    console.log("hello from index");
});

router.post("/api/createAdmin",async (req,res)=>{
    const {name,email,username,password}=req.body;
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(password,saltRounds);
    
    try{
        const createAdmin=adminSchema.create({
            adminName:name,
            adminEmail:email,
            username:username,
            password:hashPassword
        });
        res.status(200).json({created:true});

    }catch(error){
        console.error(error);
    }

});

router.post("/sendotp",async (req,res)=>{
    let {userEmail}=req.body;
    console.log(userEmail);

    const otp = Math.floor(100000 + Math.random() * 900000);
    try{
        const recipients = [new Recipient(userEmail, "Recipient")];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("OTP Verification Email for Administrator")
            .setHtml(`<strong>The otp for Administrator login is ${otp}</strong>`)
            .setText("This is the text content otp")
        await mailerSend.email.send(emailParams);
    
        await adminotpSchema.create({
            AdminEmail:userEmail,
            otp:otp
        });
    
        res.status(200).json({sent:true});
    }catch(error){
        console.error(error);
    }
});

router.post("/otpverification",async (req,res)=>{
    let {otp,adminEmail}=req.body;
    try{
        const compareotp=await adminotpSchema.findOne({AdminEmail:adminEmail,otp:otp});
        if(compareotp){
            console.log("admin verified");
            const updatedAdmin=await adminSchema.findOneAndUpdate({adminEmail:adminEmail},{valid:true},{new:true});

            if(updatedAdmin){
                res.status(200).json({verified:true});
            }else{
                res.json({verified:false});
            }
        }
    }catch(error){
        console.error(error);
    }
    
});

module.exports=router;