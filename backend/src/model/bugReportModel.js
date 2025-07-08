const mongoose = require("mongoose");

const bugReportSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    report:{ type: String, required: true },
})


module.exports = mongoose.model( "BugReport", bugReportSchema )