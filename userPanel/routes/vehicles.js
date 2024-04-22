require('dotenv').config();
const express=require("express");
const {MongoClient}=require("mongodb");
const router=express.Router();
const userModel=require("../models/usermodel");
const vehicleModel=require("../models/vehicleModel");
const {restrictedToLoggedInUserOnly}=require("../middlewares/auth");

const mongouri = process.env.RTO_MONGO_URI;
const dbName = "test";
const collectionName = "rtodetails";

const client = new MongoClient(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post("/verifydocs",restrictedToLoggedInUserOnly,async (req,res)=>{
    if(!req.user) return res.redirect("/")
    await client.connect();

    const rtodb = client.db(dbName);

    const rtoDetails = rtodb.collection(collectionName);

    let vehicleFormData={
        ownerName:req.body.ownerName,
        ownerPhone:req.body.ownerPhone,
        vehicleNo:req.body.vehicleNo,
        engineNo:req.body.engineNo,
        brand:req.body.brand,
        state:req.body.state,
        chasisNo:req.body.chasisNo,
        registrationUpto:req.body.registrationUpto,
        taxpaidUpto:req.body.taxpaidUpto,
        insurancepaidUpto:req.body.insurancepaidUpto,
        pollutionUpto:req.body.pollutionUpto
    }

    try {
        const query={owner_name:vehicleFormData.ownerName,mobile_no:vehicleFormData.ownerPhone,reg_no:vehicleFormData.vehicleNo,engine_no:vehicleFormData.engineNo,state_code:vehicleFormData.state,chassis_no:vehicleFormData.chasisNo,reg_upto:vehicleFormData.registrationUpto,tax_upto:vehicleFormData.taxpaidUpto,insurance_upto:vehicleFormData.insurancepaidUpto,pucc_upto:vehicleFormData.pollutionUpto};

        const findData=rtoDetails.find(query);

        if(findData){
            const vehicleExists=await vehicleModel.findOne({vehicleNo:vehicleFormData.vehicleNo});

            if(vehicleExists){
                res.redirect("/errorOccured?message="+"Vehicle Already Exists Please add another vehicle");
            }else{
                const currentUser=await userModel.findOne({email:req.user.email});

                const newVehicleDetails=await vehicleModel.create({
                    userId:currentUser._id,
                    ownerName:vehicleFormData.ownerName,
                    ownerPhone:vehicleFormData.ownerPhone,
                    vehicleNo:vehicleFormData.vehicleNo,
                    engineNo:vehicleFormData.engineNo,
                    brand:vehicleFormData.brand,
                    reg_state:vehicleFormData.state,
                    chasisNo:vehicleFormData.chasisNo,
                    reg_upto:vehicleFormData.registrationUpto,
                    taxPaidUpto:vehicleFormData.taxpaidUpto,
                    insurancePaidUpto:vehicleFormData.insurancepaidUpto,
                    pucValidUpto:vehicleFormData.pollutionUpto
                });
    
                res.redirect("/home");
            }
            
        }else{
            res.redirect("/errorOccured?message="+"Vehicle Details not found or vehicle details are invalid please try again with correct details");
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/vehicleData/:id",async (req,res)=>{
    let {id}=req.params;
    const vehicle=await vehicleModel.findById(id);
    res.json(vehicle);
});

router.post("/updateVehicle/:id",async (req,res)=>{
    let VehicleId=req.params.id;
    const {pollutionUpto,registrationUpto,taxpaidUpto,insurancepaidUpto}=req.body;
    try{
        const updatedVehicle=await vehicleModel.findByIdAndUpdate(VehicleId,{reg_upto:registrationUpto,taxPaidUpto:taxpaidUpto,insurancePaidUpto:insurancepaidUpto,pucValidUpto:pollutionUpto},{new:true});

        if(updatedVehicle){
            res.redirect("/home");
        }
    }catch(error){
        console.error(error);
    }
    
})

module.exports=router