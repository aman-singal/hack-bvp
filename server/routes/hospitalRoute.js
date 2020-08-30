const express = require("express");
const router = express.Router({ mergeParams: true });
const PatientModel = require("../models/Data.js").PatientModel;
const HospitalModel = require("../models/Data.js").HospitalModel;
const mongoose = require("mongoose");

const IsUserLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() && req.user.HospitalDetails) {
        return next();
    }
    res.send("User (Hospital) isn't logged in !");
};

router.get("/", (req, res) => {
    res.send(req.user); //home page for hospital portal
});

//Add the patient to previousPatientList
//assuming I will get the aadhar No
router.get("/addto/previous/:AadharNo", (req, res) => {
    PatientModel.find({ AadharNo: req.params.AadharNo }, (error, patient) => {
        if (error) res.send(error);
        const index = req.user.HospitalDetails.currentPatients.indexOf(patient);
        req.user.HospitalDetails.currentPatients.splice(index, 1); //removing from current patient list
        req.user.HospitalDetails.previousPatients.push(patient);
        res.send("Removed from the currentPatient List");
    });
});

//get current and previous patients array
router.get("/searchPaient/:x", (req, res) => {
    let currentPatients = req.user.HospitalDetails.currentPatients;
    let previousPatients = req.user.HospitalDetails.previousPatients;
    if (req.params.x == "current") res.send(currentPatients);
    if (req.params.x == "previous") res.send(previousPatients);
    if (req.params.x == "all") res.send({ currentPatients, previousPatients });
});

//Search the particular patient of the hospital by Adhar no.
router.get("/searchPatient/:AadharNo", (req, res) => {
    PatientModel.findById({ AadharNo: req.params.AadharNo }, (error, patient) => {
        if (error) {
            res.send(error);
        }
        let currentPatients = req.user.HospitalDetails.currentPatients;
        let previousPatients = req.user.HospitalDetails.previousPatients;
        if (
            currentPatients.indexOf(patient) == -1 &&
            previousPatients.indexOf(patient) == -1
        )
            res.send("No Patient in your Record!");

        res.send(patient);
    });
});

const ProcessBeforeUpdateAndAddPatient = (req, res, next) => {
    //type can be - operationdetails/prescription/LabRport
    const AddDetails = (patient) => {
        if (req.params.type == "LabReport") {
            LabReportModel.create(req.body.LabDetails, (error, LabReport) => {
                if (error) res.send(error);
                patient.LabReport = LabReport;
                patient.save();
            });
        } else if (req.params.type == "OperationDetails") {
            LabReportModel.create(
                req.body.OperationDetails,
                (error, OperationDetails) => {
                    if (error) res.send(error);
                    patient.OperationDetails = OperationDetails;
                    patient.save();
                }
            );
        } else if (req.params.type == "Prescription") {
            LabReportModel.create(req.body.Prescription, (error, Prescription) => {
                if (error) res.send(error);
                patient.Prescription = Prescription;
                patient.save();
            });
        }
        return patient;
    };

    let currentPatients = req.user.HospitalDetails.currentPatients;
    let previousPatients = req.user.HospitalDetails.previousPatients;

    //Step1 FIND THE PATIENT
    PatientModel.find({ AadharNo: req.params.AadharNo }, (error, patient) => {
        if (error) res.send(error);
        //the hospital can only edit when the patient is in currentPatientList

        if (
            currentPatients.indexOf(patient) == -1 &&
            previousPatients.indexOf(patient) == -1
        )
            res.send("No Patient in record!");
        else if (previousPatients.indexOf(patient) != -1)
            res.send("Patient is not in your currentlist");
        else if (currentPatients.indexOf(patient) != -1) {
            let promise = new Promise((resolve, reject) => {
                const result = AddDetails(patient);
                resolve(result);
            });
            promise.then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error);
                }
            );
        }
    });
};

//adding patient details
router.post(
    "/:AadharNo/addDetails/:type",
    ProcessBeforeUpdateAndAddPatient,
    (req, res) => {}
);

//UPDATE ROUTE
router.put(
    "/:AadharNo/addDetails/:type",
    ProcessBeforeUpdateAndAddPatient,
    (req, res) => {}
);

module.exports = router;