const express = require("express");
const templeterouter = express.Router();

const {
    employeeDetailTemp,
    tshirtDetailTemp,
    employeeEmailTemp
} =  require("../controllers/templeteController.js");

templeterouter.get("/download/employee-details-template", employeeDetailTemp);
templeterouter.get("/download/tshirt-details-template", tshirtDetailTemp);
templeterouter.get("/download/employee-emails-template", employeeEmailTemp);

module.exports = templeterouter;
