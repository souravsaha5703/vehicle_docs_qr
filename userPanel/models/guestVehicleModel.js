require('dotenv').config();
const mongoose=require("mongoose");

const connection=mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(()=>{
    console.log("Database and Guest Vehicle model successfully connected");
}).catch((err)=>{
    console.log(`Error occured ${err}`);
});

const GuestvehicleSchema=new mongoose.Schema({
    ownerName:{
        type:String,
        required:true
    },
    ownerPhone:{
        type:String,
        required:true
    },
    vehicleNo:{
        type:String,
        required:true,
        unique:true
    },
    engineNo:{
        type:String,
        required:true,
        unique:true
    },
    brand:{
        type:String
    },
    reg_state:{
        type:String,
        required:true
    },
    chasisNo:{
        type:String,
        required:true,
        unique:true
    },
    driverName:{
        type:String,
        required:true
    },
    driverPhone:{
        type:String,
        required:true
    },
    driver_licence_no:{
        type:String,
        required:true,
        unique:true
    },
    reg_upto:{
        type:Date,
        required:true
    },
    taxPaidUpto:{
        type:Date,
        required:true
    },
    insurancePaidUpto:{
        type:Date,
        required:true
    },
    pucValidUpto:{
        type:Date,
        required:true
    },
    fit_upto:{
        type:Date,
        required:true
    },
    permitValidupto:{
        type:Date,
        required:true
    }
});

module.exports=mongoose.model('GuestVehicleDetails',GuestvehicleSchema);