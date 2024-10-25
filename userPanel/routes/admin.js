const express=require('express');
const bcrypt=require('bcrypt');
const adminModel=require('../models/adminModel');
const router=express.Router();

router.get('/createAdmin',async (req,res)=>{
    const adminDetails={
        username:"cocacolaadmin003",
        password:"cokeadmin@2003",
        email:"vehicledoc360@gmail.com",
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
                    res.json({adminExist:true,passMatched:false});
                }
            })
        }else{
            res.json({adminExist:false});
        }
    } catch (error) {
        console.error(`Error occured ${error}`);
    }
});

router.get('/adminLogout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.error(err)
        }else{
            res.clearCookie('uid');
            res.redirect('/dashboard');
        }
    });
});

module.exports=router