const mongoose = require("mongoose");
const PrescriptionSchema = mongoose.Schema({
    PrescriptionDate: Number,
    RefDoctor: String,
    Medicine: Array,
    LabTestConsulted: Array,
});

const PrescriptionModel = mongoose.model("Prescription", prescriptionModel);
module.exports = { PrescriptionModel, PrescriptionSchema };