const express = require('express');
const adminSchema = require("../models/adminModel");
const adminotpSchema = require("../models/adminotpModel");
const bcrypt = require('bcrypt');
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const router = express.Router();

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("info@trial-jy7zpl93303l5vx6.mlsender.net", "Vehicle Docs 360");

router.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
});

router.post("/api/createAdmin", async (req, res) => {
    const { name, email, username, password } = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        const createAdmin = adminSchema.create({
            adminName: name,
            adminEmail: email,
            username: username,
            password: hashPassword
        });
        res.status(200).json({ created: true });

    } catch (error) {
        console.error(error);
    }

});

router.post("/api/adminLogin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminExist = await adminSchema.findOne({ username: username });
        if (adminExist) {
            bcrypt.compare(password, adminExist.password)
                .then((result) => {
                    if (result) {
                        res.json({ passMatch: true, adminFound: true, email: adminExist.adminEmail, name:adminExist.adminName });
                    } else {
                        res.json({ passMatch: false, adminFound: true });
                    }
                })
        } else {
            res.json({ passMatch: false, adminFound: false });
        }
    } catch (error) {
        console.error(error);
    }
});

router.post("/sendotp", async (req, res) => {
    let { userEmail,name } = req.body;
    console.log(userEmail);

    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
        const recipients = [new Recipient(userEmail, "Recipient")];

        const personalization = [
            {
              email: userEmail,
              data: {
                otp: otp,
                name: name
              },
            }
          ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("OTP Verification Email for Administrator")
            .setTemplateId('z3m5jgrd1no4dpyo')
            .setPersonalization(personalization);
        await mailerSend.email.send(emailParams);

        await adminotpSchema.create({
            AdminEmail: userEmail,
            otp: otp
        });

        res.status(200).json({ sent: true });
    } catch (error) {
        console.error(error);
    }
});

router.post("/otpverification", async (req, res) => {
    let { otp, adminEmail } = req.body;
    console.log(otp, adminEmail);
    try {
        const compareotp = await adminotpSchema.findOne({ AdminEmail: adminEmail, otp: otp });
        if (compareotp) {
            console.log("admin verified");
            const updatedAdmin = await adminSchema.findOneAndUpdate({ adminEmail: adminEmail }, { valid: true }, { new: true });

            if (updatedAdmin) {
                res.status(200).json({ verified: true });
            } else {
                res.json({ verified: false });
            }
        }
    } catch (error) {
        console.error(error);
    }

});

router.post("/loginotpverification", async (req, res) => {
    let { otp, adminEmail } = req.body;
    console.log(otp, adminEmail);
    try {
        const compareloginotp = await adminotpSchema.findOne({ AdminEmail: adminEmail, otp: otp });
        if (compareloginotp) {
            console.log("Admin Verified");
            const currentAdmin = await adminSchema.findOne({ adminEmail: adminEmail });
            req.session.username = currentAdmin.username;
            res.status(200).json({ verified: true });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;