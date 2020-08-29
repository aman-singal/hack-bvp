const mongoose = require("mongoose");
const PatientSchema = require("./patientData").PatientSchema;
const Hospitalschema = mongoose.Schema({
    HospitalName: String,
    address: String,
    currentPatients = [PatientSchema],
    previousPatients: [PatientSchema],
    Specialist: [{
        specialistName: String,
        areaOfSpecialisation: String
    }]
})

const HospitalModel = mongoose.model("Hospital", Hospitalschema);
module.exports = { HospitalModel, HospitalSchema }