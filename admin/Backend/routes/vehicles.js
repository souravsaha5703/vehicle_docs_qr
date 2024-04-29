require('dotenv').config();
const express=require('express');
const {MongoClient}=require('mongodb');
const router=express.Router();

const uri=process.env.MONGODB_CONNECTION;
const client=new MongoClient(uri);

router.get('/api/allVehicles',async (req,res)=>{
    try {
        await client.connect();
        const db=client.db('test');
        const collection=db.collection('vehicledetails');

        const vehiclesData=await collection.find({}).toArray();
        res.status(200).json(vehiclesData)
    } catch (error) {
        console.error(error);
    }
});

router.get('/api/countVehicles',async (req,res)=>{
    try {
        await client.connect();
        const db=client.db('test');
        const collection=db.collection('vehicledetails');

        await collection.countDocuments({},(err,count)=>{
            if(err){
                console.error('Error in counting users : ',err);
            }else{
                console.log(count);
                res.status.json({vehiclesCount:count});
            }
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports=router;