const mongoose = require("mongoose");
const OperationSchema = mongoose.Schema({
    reason: String,
    date: Number,
    PerformingDoctors: Array,
    status: String, //success or failure
    OperationCost: Number,
});

const OperationModel = mongoose.Model("Operation", OperationSchema);
module.exports = { OperationModel, OperationSchema };