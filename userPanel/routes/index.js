require('dotenv').config();
const express = require("express");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const {MailtrapClient} = require("mailtrap");
const router = express.Router();
const otpModel = require("../models/otpmodel");
const adminModel=require("../models/adminModel");
const vehicleModel=require("../models/vehicleModel");
const entriesModel=require('../models/entriesModel');
const {setUser}=require("../service/authtoken");
const {restrictedToLoggedInUserOnly}=require("../middlewares/auth");

// const mailerSend = new MailerSend({
//     apiKey: process.env.MAILERSEND_API_KEY,
// });

const TOKEN = process.env.MAILTRAP_API_TOKEN;

// const sentFrom = new Sender("info@trial-3z0vkloz7yx47qrx.mlsender.net", "Vehicle Docs 360");

const SENDER_EMAIL = "demomailtrap.com";
const client = new MailtrapClient({token:TOKEN});
const sender={name:"Mailtrap Test",email:SENDER_EMAIL};

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
    const otpintext= String(otp);
    try {
        client.send({
            from:sender,
            to:[{ email: data }],
            subject: "OTP Verification Email for Administrator Login",
            text: otpintext,
        })
        .then(console.log)
        .catch(console.error);
        // const recipients = [new Recipient(data, "Recipient")];

        // const personalization = [
        //     {
        //       email: data,
        //       data: {
        //         otp: otp,
        //         name: "Admin"
        //       },
        //     }
        //   ];

        // const emailParams = new EmailParams()
        //     .setFrom(sentFrom)
        //     .setTo(recipients)
        //     .setReplyTo(sentFrom)
        //     .setSubject("OTP Verification Email for Administrator Login")
        //     .setTemplateId('3vz9dlev9zp4kj50')
        //     .setPersonalization(personalization);
        // await mailerSend.email.send(emailParams);

        await otpModel.create({
            AdminEmail: data,
            otp: otp
        });

        res.render("verifyotp", { title: "Verify otp" });
    } catch (error) {
        console.error(error);
    }
});

router.post("/otpverification",async (req,res)=>{
    const otpData=req.body.otp;
    const sessionEmail=req.session.adminEmail;
    try{
        const user=await otpModel.findOne({AdminEmail:sessionEmail,otp:otpData});
        if(user){
            console.log("Admin Verified");
            const activeAdmin=await adminModel.findOne({_id:req.session.adminid});
            
            const token=setUser(activeAdmin);
            res.cookie("uid",token);
            res.json({verified:true});
        }else{
            res.json({verified:false});
        }
    }catch(error){
        console.error(error);
        throw error;
    }
});

router.get("/dashboard",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let admin={
        username:req.user.username,
        email:req.user.email
    };
    const allEntries=await entriesModel.find({});
    const arrayIds=[];
    for(let i=0;i<allEntries.length;i++){
        arrayIds.push(allEntries[i].vehicleId);
    }
    const allEntryData=[];
    vehicleModel.find({_id:{$in:arrayIds}})
    .then(documents=>{
        for (let i = 0; i < arrayIds.length; i++){
            const id = arrayIds[i];
            const matchingdoc=documents.find(doc => doc._id.toString() === id.toString());
            if (matchingdoc) {
                let dataObj={
                        vno:matchingdoc.vehicleNo,
                        owner:matchingdoc.ownerName,
                        driverLicence:matchingdoc.driver_licence_no,
                        time:allEntries[i].timestamp
                };
                allEntryData.push(dataObj);
            } else {
                console.log("No document found for ID:");
            }
        }
        const today=new Date().toISOString().split('T')[0];
        const todaysData=[];
        for(let data of allEntryData){
           if(data.time.toISOString().split('T')[0]==today){
            todaysData.push({...data})
           }
        }
        if(allEntryData.length>0){
            res.render("dashboard",{admin,entryData:allEntryData,status:true,newData:todaysData});
        }else{
            res.render("dashboard",{admin,status:false});
        }
    })
    .catch(err => {
        console.error(err);
    });
});

router.get("/allVehicles",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let admin={
        username:req.user.username,
        email:req.user.email
    };
    let status;
    const allVehicle=await vehicleModel.find({});
    if(allVehicle){
        status=true
        res.render("allVehicles",{admin,status:status,vehicleData:allVehicle});
    }else{
        status=false
        res.render("allVehicles",{admin,status:status,vehicleData:"No vehicle added"});
    }
});

router.get("/add_vehicles",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let admin={
        username:req.user.username,
        email:req.user.email
    };

    res.render("addVehicles",{admin});
});

router.get("/update_vehicles",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    let admin={
        username:req.user.username,
        email:req.user.email
    };
    let status;
    const allVehicleforUpdate=await vehicleModel.find({});
    if(allVehicleforUpdate){
        status=true
        res.render("updateVehicle",{admin,status:status,vehicleData:allVehicleforUpdate});
    }else{
        status=false
        res.render("updateVehicle",{admin,status:status,vehicleData:"No vehicle available"});
    }
});

router.get("/errorOccured",(req,res)=>{
    let data={
        message:req.query.message
    }
    res.render("errorPage",data);
});

module.exports = router;
