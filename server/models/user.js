const mongoose = require("mongoose");
const localPassportMongoose = require("passport-local-mongoose");
const PatientSchema = require("./patientData").PatientSchema;
const HospitalSchema = require("./hospitalData").HospitalSchema;

const userSchema = new mongoose.Schema({
    username: Number, //username is the unique id
    UserType: String,
    password: String,
    PatientDetails: PatientSchema,
    HospitalDetails: HospitalSchema,
});

userSchema.plugin(localPassportMongoose);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;