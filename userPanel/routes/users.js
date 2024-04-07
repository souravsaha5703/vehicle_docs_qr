const express=require("express");
const router=express.Router();
const userModel=require("../models/usermodel");

router.post("/registeruser",async (req,res)=>{
    const signupData={
        name:req.body.fullname,
        email:req.body.email,
        phone:req.body.phonenumber
    }

    const existingUser=await userModel.findOne({email:signupData.email,phoneno:signupData.phone});
    if(existingUser){
        res.redirect("/error?message="+"Email and phone already exists please create another");
    }else{
        const newUser=await userModel.create({
            fullname:signupData.name,
            email:signupData.email,
            phoneno:signupData.phone
        });
    
        const user=newUser._id;
        req.session.userEmail=signupData.email;
        req.session.useridentity=user;
    
        const sessionExpireTime=5*60*100;
        req.session.cookie.expires=new Date(Date.now()+sessionExpireTime);
        req.session.cookie.maxAge=sessionExpireTime;
        res.redirect("/verifyotp");
    }
});

router.post("/signin",async (req,res)=>{
    try{
        const userExists=await userModel.findOne({email:req.body.email});
        if(!userExists){
            res.redirect("/error?message="+"No user found");
        }else{
            let user=userExists._id;
            req.session.userEmail=userExists.email;
            req.session.useridentity=user;
            res.redirect("/verifyotp");
        }
    }catch(error){
        console.error(error);
        throw error;
    }
});


module.exports=router