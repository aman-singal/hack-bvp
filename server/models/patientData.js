const mongoose = require("mongoose");
const HospitalSchema = require("./hospitalData").HospitalSchema;
const PrescriptionSchema = require("./LabReport").PrescriptionSchema;
const OperationSchema = require("./LabReport").OperationSchema;
const LabReportSchema = require("./LabReport").LabReportSchema;

const patientSchema = new mongoose.Schema({
    PatientName: String,
    AadharNo: Number,
    sex: String,
    age: Number,
    OperationDetails: [OperationSchema],
    LabReport: [LabReportSchema],
    prescription: [PrescriptionSchema],
    hospital: [HospitalSchema],
});

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = { PatientModel, PatientSchema };