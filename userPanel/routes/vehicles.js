require('dotenv').config();
const express=require("express");
const {MongoClient}=require("mongodb");
const qrcode=require('qrcode');
const router=express.Router();
const vehicleModel=require("../models/vehicleModel");
const {restrictedToLoggedInUserOnly}=require("../middlewares/auth");

router.post("/addVehicleDetails",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")

    let {ownerName,ownerPhone,vehicleNo,engineNo,brand,state,driverName,driverPhone,driverLicence,chasisNo,permitvalidUpto,registrationUpto,taxpaidUpto,insurancepaidUpto,pollutionUpto,fitUpto}=req.body;
    try {
        const vehicleExists=await vehicleModel.findOne({vehicleNo:vehicleNo});
        if(vehicleExists){
            res.redirect("/errorOccured?message="+"Vehicle Already Exists Please add another vehicle");
        }else{
            await vehicleModel.create({
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

            res.redirect("/dashboard");
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/vehicleData/:id",async (req,res)=>{
    let {id}=req.params;
    const vehicle=await vehicleModel.findById(id);
    res.json(vehicle);
});

router.post("/updateVehicle/:id",async (req,res)=>{
    let VehicleId=req.params.id;
    const {pollutionUpto,registrationUpto,taxpaidUpto,insurancepaidUpto,fitUpto,permitvalidupto}=req.body;
    try{
        const updatedVehicle=await vehicleModel.findByIdAndUpdate(VehicleId,{reg_upto:registrationUpto,taxPaidUpto:taxpaidUpto,insurancePaidUpto:insurancepaidUpto,pucValidUpto:pollutionUpto,fit_upto:fitUpto,permitValidupto:permitvalidupto},{new:true});

        if(updatedVehicle){
            res.redirect("/dashboard");
        }
    }catch(error){
        console.error(error);
    }
    
});

router.get("/getqr/:id",async (req,res)=>{
    let {id}=req.params;
    try {
        const specificVehicle=await vehicleModel.findById(id);
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

router.post("/verifyVehicleDetails",async (req,res)=>{
    let verificationData =req.body;
    try {
        const findVehicleData=await vehicleModel.findOne({
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

module.exports=router