require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');
const router = express.Router();

router.get('/createAdmin', async (req, res) => {
    const adminDetails = {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        email: "vehicledoc360@gmail.com",
        compname: "Coca Cola"
    };

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(adminDetails.password, saltRounds);

    try {
        const newAdmin = await adminModel.create({
            username: adminDetails.username,
            password: hashPassword,
            admin_email: adminDetails.email,
            company_name: adminDetails.compname
        });

        res.send(newAdmin);
    } catch (error) {
        console.error(error);
    }
});

router.post('/adminLogin', async (req, res) => {
    let { username, password } = req.body;

    try {
        const adminExist = await adminModel.findOne({ username: username });
        if (adminExist) {
            bcrypt.compare(password, adminExist.password)
                .then((result) => {
                    if (result) {
                        res.status(201).json({ status: 201, response: adminExist, message: "Admin Verified" });
                    } else {
                        res.status(400).json({ status: 400, message: "Incorrect Password" });
                    }
                })
        } else {
            res.status(400).json({ status: 400, message: "Incorrect Credentials" });
        }
    } catch (error) {
        console.error(`Error occured ${error}`);
    }
});

router.get('/adminLogout', (req, res) => {
    res.clearCookie('uid');
    res.status(201).json({ status: 201, message: "Successfully Logged Out" });
});

module.exports = router