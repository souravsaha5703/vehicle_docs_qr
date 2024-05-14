const express=require('express');
const entriesModel=require('../models/entriesModel');
const router=express.Router();

router.post("/createEntry",async (req,res)=>{
    let {id}=req.body;
    try {
        const createEntry=new entriesModel({vehicleId:id});
        await createEntry.save();
        res.status(201).json({done:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({done:false});
    }
});

module.exports=router;