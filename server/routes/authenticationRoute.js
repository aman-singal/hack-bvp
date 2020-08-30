const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const PatientModel = require("../models/Data.js").PatientModel;
const UserModel = require("../models/Data.js").UserModel;
const HospitalModel = require("../models/Data.js").HospitalModel;

router.get("/signup", (req, res) => {
    //render the signup page;
});

router.post("/signup", (req, res) => {
    let newUser = new User({
        username: req.body.username,
        userType: req.body.userType,
    });
    User.register(newUser, req.body.password, (error, user) => {
        if (error) console.log(error);
        passport.authenticate("local")(req, res, function() {
            if (req.body.userType == "Patient") {
                PatientModel.create({
                        PatientName: req.body.patientName,
                        AadharNo: req.body.AadharNo,
                        sex: req.body.sex,
                        age: req.body.age,
                    },
                    (error, patient) => {
                        if (error) console.log(error);
                        user.PatientDetails = patient;
                        user.save();
                    }
                );
            }
            res.send(req.user); //Write code send patient details
            if (req.body.userType == "Hospital") {
                HospitalModel.create({
                        HospitalName: req.body.HospitalName,
                        address: req.body.address,
                    },
                    (error, hospital) => {
                        if (error) console.log(error);
                        user.HospitalDetails = hospital;
                        user.save();
                    }
                );
            }
            res.send(req.user); //Write code send hospital details
        });
    });
});

router.get("/login", (req, res) => {
    //render the login page;
});

router.post(
    "/login/:x", //x means patient or hospital
    passport.authenticate("local"),
    (req, res) => {
        res.send(req.user);
    }
);

router.get("/logout", function(req, res) {
    req.logout();
});

module.exports = router;