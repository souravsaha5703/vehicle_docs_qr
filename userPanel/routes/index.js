require('dotenv').config();
const express = require("express");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const router = express.Router();
const otpModel = require("../models/otpmodel");
const userModel=require("../models/usermodel");
const vehicleModel=require("../models/vehicleModel");
const {setUser}=require("../service/authtoken");
const {restrictedToLoggedInUserOnly}=require("../middlewares/auth");

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("info@trial-jy7zpl93303l5vx6.mlsender.net", "Vehicle Docs 360");

router.get("/", (req, res) => {
    res.render("login", { title: 'login' });
});

router.get("/signup", (req, res) => {
    res.render("signup", { title: "signup" });
});

router.get("/verifyotp", async (req, res) => {
    let data = req.session.adminEmail;
    console.log(data);

    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
        const recipients = [new Recipient(data, "Recipient")];

        const personalization = [
            {
              email: data,
              data: {
                otp: otp,
                name: "Admin"
              },
            }
          ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("OTP Verification Email for Administrator Login")
            .setTemplateId('z3m5jgrd1no4dpyo')
            .setPersonalization(personalization);
        await mailerSend.email.send(emailParams);

        await otpModel.create({
            AdminEmail: data,
            otp: otp
        });

        res.render("verifyotp", { title: "Verify otp" });
    } catch (error) {
        console.error(error);
    }
    res.render("verifyotp", { title: "hehe" });
});

router.post("/otpverification",async (req,res)=>{
    const otpData=req.body.otp;
    const sessionEmail=req.session.adminEmail;
    try{
        const user=await otpModel.findOne({AdminEmail:sessionEmail,otp:otpData});
        if(user){
            console.log("Admin Verified");
            let adminId=req.session.adminid;
            
            const token=setUser(adminId);
            res.cookie("uid",token);
            // res.redirect("/home");
            res.send("verified");
        }else{
            res.redirect("/error?message="+"OTP unverified");
        }
    }catch(error){
        console.error(error);
        throw error;
    }
});

router.get("/home",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let userObjectData={
        userName:req.user.name,
        userEmail:req.user.email,
        userPhone:req.user.ph
    }
    let status;
    const allVehicle=await vehicleModel.find({userId:req.user._id});
    if(allVehicle){
        status=true
        res.render("home",{userObjectData,status:status,vehicleData:allVehicle});
    }else{
        status=false
        res.render("home",{userObjectData,status:status,vehicleData:"No vehicle added"});
    }
});

router.get("/add_vehicles",restrictedToLoggedInUserOnly,(req,res)=>{
    if(!req.user) return res.redirect("/")
    let userObjectData={
        userName:req.user.name,
        userEmail:req.user.email,
        userPhone:req.user.ph
    }
    res.render("addVehicles",{userObjectData});
});

router.get("/update_vehicles",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let userObjectData={
        userName:req.user.name,
        userEmail:req.user.email,
        userPhone:req.user.ph
    }
    let status;
    const allVehicleforUpdate=await vehicleModel.find({userId:req.user._id});
    if(allVehicleforUpdate){
        status=true
        res.render("updateVehicle",{userObjectData,status:status,vehicleData:allVehicleforUpdate});
    }else{
        status=false
        res.render("updateVehicle",{userObjectData,status:status,vehicleData:"No vehicle added"});
    }
});

router.get("/error",(req,res)=>{
    let data={
        message:req.query.message
    }
    res.render("error",data);
});

router.get("/errorOccured",(req,res)=>{
    let data={
        message:req.query.message
    }
    res.render("errorPage",data);
});

module.exports = router;
