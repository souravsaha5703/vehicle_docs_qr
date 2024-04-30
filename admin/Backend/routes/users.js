require('dotenv').config();
const express=require('express');
const {MongoClient}=require('mongodb');
const router=express.Router();

const uri=process.env.MONGODB_CONNECTION;
const client=new MongoClient(uri);

router.get('/api/allUsers',async (req,res)=>{
    try {
        await client.connect();
        const db=client.db('test');
        const collection=db.collection('users');

        const usersData=await collection.find({}).toArray();
        res.status(200).json(usersData)
    } catch (error) {
        console.error(error);
    }
});

router.get('/api/countUsers',async (req,res)=>{
    try {
        await client.connect();
        const db=client.db('test');
        const collection=db.collection('users');

        const usersCount=await collection.countDocuments();

        // res.status(200).json({count:usersCount});
    } catch (error) {
        console.error(error);
    }
});

module.exports=router;