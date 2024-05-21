const express=require('express');
const bcrypt=require('bcrypt');
const adminModel=require('../models/adminModel');
const router=express.Router();

router.get('/createAdmin',async (req,res)=>{
    const adminDetails={
        username:"cocacolaadmin003",
        password:"cokeadmin@2003",
        email:"techmintbangla003@gmail.com",
        compname:"Coca Cola"
    };

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(adminDetails.password, saltRounds);

    try {
        const newAdmin=await adminModel.create({
            username:adminDetails.username,
            password:hashPassword,
            admin_email:adminDetails.email,
            company_name:adminDetails.compname
        });

        res.send(newAdmin);
    } catch (error) {
        console.error(error);
    }
});

router.post('/adminLogin',async (req,res)=>{
    let {username,password}=req.body;

    try {
        const adminExist=await adminModel.findOne({username:username});
        if(adminExist){
            bcrypt.compare(password,adminExist.password)
            .then((result) => {
                if (result) {
                    let adminId=adminExist._id;
                    req.session.adminEmail=adminExist.admin_email;
                    req.session.adminid=adminId;
                    res.json({adminExist:true,passMatched:true});
                } else {
                    // res.redirect("/error?message="+"Password does not match");
                    res.json({adminExist:true,passMatched:false});
                }
            })
        }else{
            // res.redirect("/error?message="+"Admin not found, please try again with valid credentials");
            res.json({adminExist:false});
        }
    } catch (error) {
        console.error(`Error occured ${error}`);
    }
})

module.exports=router