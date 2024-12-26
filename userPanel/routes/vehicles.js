require('dotenv').config();
const express = require("express");
const { MongoClient } = require("mongodb");
const qrcode = require('qrcode');
const router = express.Router();
const vehicleModel = require("../models/vehicleModel");
const { restrictedToLoggedInUserOnly } = require("../middlewares/auth");
const axios = require("axios");

router.get("/searchVehicles/:vehicleNo", restrictedToLoggedInUserOnly, async (req, res) => {
    let { vehicleNo } = req.params;
    let vehicleExists = await vehicleModel.findOne({ vehicleNo: vehicleNo });

    if (vehicleExists) {
        res.status(400).json({ status: 400, message: "Vehicle is already registered" });
    } else {
        const options = {
            method: 'GET',
            url: `https://rc-verification-india.p.rapidapi.com/${vehicleNo}`,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_API_KEY_SECOND,
                'x-rapidapi-host': 'rc-verification-india.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            res.status(201).json({ status: 201, response: response.data });
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: 400, message: "Something Went Wrong" });
        }
    }
});

router.post("/addVehicleDetails", restrictedToLoggedInUserOnly, async (req, res) => {

    let { ownerName, ownerPhone, vehicleNo, engineNo, driverName, driverLicence, chasisNo, permitvalidUpto, registrationAt, taxpaidUpto, insurancepaidUpto, pollutionUpto, fitUpto } = req.body;
    try {
        await vehicleModel.create({
            ownerName: ownerName,
            ownerPhone: ownerPhone,
            vehicleNo: vehicleNo,
            engineNo: engineNo,
            driverName: driverName,
            driver_licence_no: driverLicence,
            chasisNo: chasisNo,
            permitValidupto: permitvalidUpto,
            reg_at: registrationAt,
            taxPaidUpto: taxpaidUpto,
            insurancePaidUpto: insurancepaidUpto,
            pucValidUpto: pollutionUpto,
            fit_upto: fitUpto
        });

        res.status(201).json({ status: 201, message: "Vehicle Added" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
});

router.get("/allVehiclesData", restrictedToLoggedInUserOnly, async (req, res) => {
    const allVehicle = await vehicleModel.find({});
    if (allVehicle) {
        res.status(201).json({ status: 201, response: allVehicle, message: "All Vehicle Data Fetched" });
    } else {
        res.status(400).json({ status: 400, message: "No Vehicle Added Yet" });
    }
});

router.get("/vehicleData/:id", restrictedToLoggedInUserOnly, async (req, res) => {
    let { id } = req.params;
    const vehicle = await vehicleModel.findById(id);
    res.status(201).json({ status: 201, response: vehicle });
});

// router.post("/updateVehicle/:id", async (req, res) => {
//     let VehicleId = req.params.id;
//     const { pollutionUpto, registrationUpto, taxpaidUpto, insurancepaidUpto, fitUpto, permitvalidupto } = req.body;
//     try {
//         const updatedVehicle = await vehicleModel.findByIdAndUpdate(VehicleId, { reg_upto: registrationUpto, taxPaidUpto: taxpaidUpto, insurancePaidUpto: insurancepaidUpto, pucValidUpto: pollutionUpto, fit_upto: fitUpto, permitValidupto: permitvalidupto }, { new: true });

//         if (updatedVehicle) {
//             res.redirect("/dashboard");
//         }
//     } catch (error) {
//         console.error(error);
//     }

// });

router.delete("/removeVehicle/:id", restrictedToLoggedInUserOnly, async (req, res) => {
    let { id } = req.params;
    try {
        const result = await vehicleModel.findByIdAndDelete(id);
        if (result) {
            res.status(201).json({ status: 201, success: true, message: "Vehicle successfully deleted" })
        } else {
            res.status(400).json({ status: 400, success: false, message: "Error in deleting vehicle" })
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/getqr/:id", restrictedToLoggedInUserOnly, async (req, res) => {
    let { id } = req.params;
    try {
        const specificVehicle = await vehicleModel.findById(id);
        const urlData = {
            vehicleId: specificVehicle._id,
            ownerName: specificVehicle.ownerName,
            ownerPhone: specificVehicle.ownerPhone,
            vehicleNo: specificVehicle.vehicleNo,
            engineNo: specificVehicle.engineNo,
            chasisNo: specificVehicle.chasisNo,
            driverName: specificVehicle.driverName,
            driverLicence: specificVehicle.driver_licence_no,
            regDate: specificVehicle.reg_upto,
            taxpaidupto: specificVehicle.taxPaidUpto,
            insuranceupto: specificVehicle.insurancePaidUpto,
            pucvalid: specificVehicle.pucValidUpto,
            fitupto: specificVehicle.fit_upto,
            permitupto: specificVehicle.permitValidupto
        };

        const urlJson = JSON.stringify(urlData);
        qrcode.toDataURL(urlJson, (err, qr) => {
            if (err) {
                res.status(400).json({ status: 400, message: "Error in generating QR Code" })
                console.error(err);
            } else {
                res.status(201).json({ status: 201, img_url: qr, message: "QR Code Generated" });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

router.post("/verifyVehicleDetails", async (req, res) => {
    let verificationData = req.body;
    try {
        const findVehicleData = await vehicleModel.findOne({
            ownerName: verificationData.ownerName,
            ownerPhone: verificationData.ownerPhone,
            vehicleNo: verificationData.vehicleNo,
            engineNo: verificationData.engineNo,
            chasisNo: verificationData.chasisNo,
            driverName: verificationData.driverName,
            driver_licence_no: verificationData.driverLicence,
            reg_upto: verificationData.regDate,
            taxPaidUpto: verificationData.taxpaidupto,
            insurancePaidUpto: verificationData.insuranceupto,
            pucValidUpto: verificationData.pucvalid,
            fit_upto: verificationData.fitupto,
            permitValidupto: verificationData.permitupto
        });

        if (findVehicleData) {
            res.json({ verified: true });
            console.log("vehicle verified");
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router