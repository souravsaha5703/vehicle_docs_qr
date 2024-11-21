require('dotenv').config();
const express = require("express");
const { MailtrapClient } = require("mailtrap");
const router = express.Router();
const otpModel = require("../models/otpmodel");
const adminModel = require("../models/adminModel");
const vehicleModel = require("../models/vehicleModel");
const entriesModel = require('../models/entriesModel');
const { setUser } = require("../service/authtoken");
const { restrictedToLoggedInUserOnly } = require("../middlewares/auth");

const TOKEN = process.env.MAILTRAP_API_TOKEN;

const SENDER_EMAIL = process.env.SENDER_MAIL_ID;

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Vehicle Doc 360", email: SENDER_EMAIL };

router.get("/", (req, res) => {
    res.render("Welcome");
});

router.post("/sendotp", async (req, res) => {
    let { adminEmail } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpintext = String(otp);
    try {
        client.send({
            from: sender,
            to: [{ email: adminEmail }],
            template_uuid: "9513c79e-99bb-4b32-a9fb-b8be9695bb8f",
            template_variables: {
                "name": "Admin",
                "otp": otpintext
            }
        })
            .then(console.log)
            .catch(console.error);

        await otpModel.create({
            AdminEmail: adminEmail,
            otp: otp
        });

        res.status(201).json({ status: 201, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
    }
});

router.post("/otpverification", async (req, res) => {
    const { otp, email } = req.body;
    try {
        const user = await otpModel.findOne({ AdminEmail: email, otp: otp });
        if (user) {
            console.log("Admin Verified");
            const activeAdmin = await adminModel.findOne({ admin_email: email });
            const token = setUser(activeAdmin);
            res.cookie("uid", token);
            res.status(201).json({ status: 201, token: token, response: activeAdmin, message: "OTP valid and Admin login succesfull" });
        } else {
            res.status(400).json({ status: 400, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});

router.get("/getAdmin", restrictedToLoggedInUserOnly, async (req, res) => {
    res.json({ verified: true, user: req.user, message: "Token Verified" });
});

router.get("/dashboard", restrictedToLoggedInUserOnly, async (req, res) => {
    const allEntries = await entriesModel.find({});
    const arrayIds = [];
    for (let i = 0; i < allEntries.length; i++) {
        arrayIds.push(allEntries[i].vehicleId);
    }
    const allEntryData = [];
    vehicleModel.find({ _id: { $in: arrayIds } })
        .then(documents => {
            for (let i = 0; i < arrayIds.length; i++) {
                const id = arrayIds[i];
                const matchingdoc = documents.find(doc => doc._id.toString() === id.toString());
                if (matchingdoc) {
                    let dataObj = {
                        vno: matchingdoc.vehicleNo,
                        owner: matchingdoc.ownerName,
                        driverLicence: matchingdoc.driver_licence_no,
                        time: allEntries[i].timestamp
                    };
                    allEntryData.push(dataObj);
                } else {
                    console.log("No document found for ID:");
                }
            }
            if (allEntryData.length > 0) {
                res.status(201).json({ status: 201, response: allEntryData });
            } else {
                res.status(400).json({ status: 400, message: "NO ENTRY FOUND" });
            }
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
