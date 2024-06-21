const express=require('express');
const router=express.Router();
const qrcode=require('qrcode');
const guestVehicleModel=require('../models/guestVehicleModel');
const guestEntryModel=require("../models/guestEntryDetails");

router.get('/guestlogin',(req,res)=>{
    res.render("guestAlertPage");
});

router.get('/guestDashboard',async (req,res)=>{
    let admin={
        username:"guestuser",
        email:"guest@gmail.com"
    };
    const allEntries=await guestEntryModel.find({});
    const arrayIds=[];
    for(let i=0;i<allEntries.length;i++){
        arrayIds.push(allEntries[i].vehicleId);
    }
    const allEntryData=[];
    guestVehicleModel.find({_id:{$in:arrayIds}})
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
            res.render("guestDashboard",{admin,entryData:allEntryData,status:true,newData:todaysData});
        }else{
            res.render("guestDashboard",{admin,status:false});
        }
    })
    .catch(err => {
        console.error(err);
    });
});

router.post("/guestVehicleAdd",async (req,res)=>{
    let {ownerName,ownerPhone,vehicleNo,engineNo,brand,state,driverName,driverPhone,driverLicence,chasisNo,permitvalidUpto,registrationUpto,taxpaidUpto,insurancepaidUpto,pollutionUpto,fitUpto}=req.body;
    try {
        const vehicleExists=await guestVehicleModel.findOne({vehicleNo:vehicleNo});
        if(vehicleExists){
            res.redirect("/errorOccured?message="+"Vehicle Already Exists Please add another vehicle");
        }else{
            await guestVehicleModel.create({
                ownerName:ownerName,
                ownerPhone:ownerPhone,
                vehicleNo:vehicleNo,
                engineNo:engineNo,
                brand:brand,
                reg_state:state,
                driverName:driverName,
                driverPhone:driverPhone,
                driver_licence_no:driverLicence,
                chasisNo:chasisNo,
                permitValidupto:permitvalidUpto,
                reg_upto:registrationUpto,
                taxPaidUpto:taxpaidUpto,
                insurancePaidUpto:insurancepaidUpto,
                pucValidUpto:pollutionUpto,
                fit_upto:fitUpto
            });

            res.redirect("/guestDashboard");
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/guest_add_vehicles",async (req,res)=>{
    let admin={
        username:"guestuser",
        email:"guest@gmail.com"
    };

    res.render("guestVehicleAdd",{admin});
});

router.get("/guestVehicles",async (req,res)=>{
    let admin={
        username:"guestuser",
        email:"guest@gmail.com"
    };
    let status;
    const allVehicle=await guestVehicleModel.find({});
    if(allVehicle){
        status=true
        res.render("guestVehicles",{admin,status:status,vehicleData:allVehicle});
    }else{
        status=false
        res.render("guestVehicles",{admin,status:status,vehicleData:"No vehicle added"});
    }
});

router.get("/guestvehicleData/:id",async (req,res)=>{
    let {id}=req.params;
    const vehicle=await guestVehicleModel.findById(id);
    res.json(vehicle);
});

router.get("/guestgetqr/:id",async (req,res)=>{
    let {id}=req.params;
    try {
        const specificVehicle=await guestVehicleModel.findById(id);
        const urlData={
            vehicleId:specificVehicle._id,
            ownerName:specificVehicle.ownerName,
            ownerPhone:specificVehicle.ownerPhone,
            vehicleNo:specificVehicle.vehicleNo,
            engineNo:specificVehicle.engineNo,
            brand:specificVehicle.brand,
            regState:specificVehicle.reg_state,
            chasisNo:specificVehicle.chasisNo,
            driverName:specificVehicle.driverName,
            driverPhone:specificVehicle.driverPhone,
            driverLicence:specificVehicle.driver_licence_no,
            regDate:specificVehicle.reg_upto,
            taxpaidupto:specificVehicle.taxPaidUpto,
            insuranceupto:specificVehicle.insurancePaidUpto,
            pucvalid:specificVehicle.pucValidUpto,
            fitupto:specificVehicle.fit_upto,
            permitupto:specificVehicle.permitValidupto
        };

        const urlJson=JSON.stringify(urlData);
        qrcode.toDataURL(urlJson,(err,qr)=>{
            if(err){
                console.error(err);
                return;
            }else{
                res.json({img_url:qr});
            }
        });
    } catch (error) {
        console.error(error);
    }
});

router.post("/guestVerifyVehicleDetails",async (req,res)=>{
    let verificationData =req.body;
    try {
        const findVehicleData=await guestVehicleModel.findOne({
            ownerName:verificationData.ownerName,
            ownerPhone:verificationData.ownerPhone,
            vehicleNo:verificationData.vehicleNo,
            engineNo:verificationData.engineNo,
            brand:verificationData.brand,
            reg_state:verificationData.regState,
            chasisNo:verificationData.chasisNo,
            driverName:verificationData.driverName,
            driverPhone:verificationData.driverPhone,
            driver_licence_no:verificationData.driverLicence,
            reg_upto:verificationData.regDate,
            taxPaidUpto:verificationData.taxpaidupto,
            insurancePaidUpto:verificationData.insuranceupto,
            pucValidUpto:verificationData.pucvalid,
            fit_upto:verificationData.fitupto,
            permitValidupto:verificationData.permitupto
        });

        if(findVehicleData){
            res.json({verified:true});
            console.log("vehicle verified");
        }else{
            res.json({verified:false});
        }
    } catch (error) {
        console.error(error);
    }
});

router.post("/createGuestEntry",async (req,res)=>{
    let {id}=req.body;
    try {
        const createEntry=new guestEntryModel({vehicleId:id});
        await createEntry.save();
        res.status(201).json({done:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({done:false});
    }
});

module.exports=router;