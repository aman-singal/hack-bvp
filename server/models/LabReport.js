const mongoose = require("mongoose");
const LabReportSchema = mongoose.Schema({
    SampleCollectionDate: Number,
    RefDoctor: String,
    Result: String,
    ReportDescription: String,
    LabId: Number,
});

const LabReportModel = mongoose.model("LabReport", LabReportSchema);
module.exports = { LabReportModel, LabReportSchema };