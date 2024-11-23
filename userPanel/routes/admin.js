require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');
const router = express.Router();

router.post('/createAdmin', async (req, res) => {

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    try {
        const newAdmin = await adminModel.create({
            username: req.body.username,
            password: hashPassword,
            admin_email: req.body.email,
            company_name: req.body.compname
        });

        res.status(201).json({ status: 201, response: newAdmin });
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