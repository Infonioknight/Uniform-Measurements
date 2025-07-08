const express = require("express");
const bodyMeasurementsRouter = express.Router(); // Correct variable name
const {protect}  = require("../middleware/authMiddleware.js");
const { createUserMeasurement, getUserMeasurement } = require("../controllers/bodyMeasurementController.js");

// Router for creating user measurement
bodyMeasurementsRouter.post("/user/body/measurement/:userId", protect,  createUserMeasurement);
// Router for getting user measurement
bodyMeasurementsRouter.get("/user/body/measurement/:userId", protect,  getUserMeasurement);

module.exports = bodyMeasurementsRouter;