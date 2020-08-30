const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { PatientModel } = require("../models/Data.js");
const { LabReportModel } = require("../models/Data.js");
const { PrescriptionModel } = require("../models/Data.js");
const { OperationModel } = require("../models/Data.js");
const { HospitalModel } = require("../models/Data.js");
const IsUserLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() && req.user.PatientDetails) {
        return next();
    }
    res.send("User (Patient) isn't logged in !");
};

router.use(IsUserLoggedIn); //before every request, it is being checked that is user already logged in/ not

router.get("/home", (req, res) => {
    res.send(req.user.PatientDetails);
    //patient profile/homepage.
});

router.get("/:medicalRecord", (req, res) => {
    if (req.params.medicalRecord == "LabReport")
        res.send(req.user.PatientDetails.LabReport); //LabReport is an array
    if (req.params.medicalRecord == "prescription")
        res.send(req.user.PatientDetails.prescription);
    if (req.params.medicalRecord == "operation")
        res.send(req.user.PatientDetails.operationDetails);
});

router.get("/:medicalRecord/:id", (req, res) => {
    if (req.params.medicalRecord == "LabReport") {
        LabReportModel.findById(req.params.id, (error, result) => {
            if (error) res.send(error + "No such record");
            else res.send(result);
        });
    }
    if (req.params.medicalRecord == "prescription") {
        PrescriptionModel.findById(req.params.id, (error, result) => {
            if (error) res.send(error + "No such record");
            else res.send(result);
        });
    }
    if (req.params.medicalRecord == "operation") {
        OperationModel.findById(req.params.id, (error, result) => {
            if (error) res.send(error + "No such record");
            else res.send(result);
        });
    }
});

//give access to a hospital for adding record, when patient admits in hospital.
//ask patient to enter hospital id in form.

router.post("/giveaccess", (req, res) => {
    PatientModel.findById(req.user.PatientDetails._id, (error, patient) => {
        if (error) res.send(error + "No patient found");
        HospitalModel.findById(req.body.id, (error, hospital) => {
            if (error) res.send(error + "Hospital Not found");
            hospital.currentPatients.push(patient);
            hospital.save();
            patient.hospital.push(hospital);
            patient.save();
        });
    });
});
router.post("/predictDisease", (req, res) => {
    req.body; //parameters for prediction
    //write logic to find the disease
});

module.exports = router;