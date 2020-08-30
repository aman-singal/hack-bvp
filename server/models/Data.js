const mongoose = require("mongoose");
const localPassportMongoose = require("passport-local-mongoose");

//LabReports
const LabReportSchema = new mongoose.Schema({
    SampleCollectionDate: Number,
    RefDoctor: String,
    Result: String,
    ReportDescription: String,
    LabId: Number,
});

const LabReportModel = mongoose.model("LabReport", LabReportSchema);
module.exports.LabReportModel = LabReportModel;

//Prescription
const PrescriptionSchema = new mongoose.Schema({
    PrescriptionDate: Number,
    RefDoctor: String,
    Medicine: Array,
    LabTestConsulted: Array,
});

const PrescriptionModel = mongoose.model("Prescription", PrescriptionSchema);
module.exports.PrescriptionModel = PrescriptionModel;

//operation details
const OperationSchema = new mongoose.Schema({
    reason: String,
    date: Number,
    PerformingDoctors: Array,
    status: String, //success or failure
    OperationCost: Number,
});

const OperationModel = mongoose.model("Operation", OperationSchema);
module.exports.OperationModel = OperationModel;

//PatientData
const PatientSchema = new mongoose.Schema({
    PatientName: String,
    AadharNo: Number,
    sex: String,
    age: Number,
    OperationDetails: [OperationSchema],
    LabReport: [LabReportSchema],
    prescription: [PrescriptionSchema],
    //hospital: [HospitalSchema],
});
const PatientModel = mongoose.model("Patient", PatientSchema);
module.exports.PatientModel = PatientModel;

//Hospital Details
const HospitalSchema = new mongoose.Schema({
    HospitalName: String,
    address: String,
    currentPatients: [PatientSchema],
    previousPatients: [PatientSchema],
    Specialist: [{
        specialistName: String,
        areaOfSpecialisation: String,
    }, ],
});

const HospitalModel = mongoose.model("Hospital", HospitalSchema);
module.exports.HospitalModel = HospitalModel;

//user details

const userSchema = new mongoose.Schema({
    username: Number, //username is the unique id
    UserType: String,
    password: String,
    PatientDetails: PatientSchema,
    HospitalDetails: HospitalSchema,
});

userSchema.plugin(localPassportMongoose);

const UserModel = mongoose.model("User", userSchema);
module.exports.UserModel = UserModel;