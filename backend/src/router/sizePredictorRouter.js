const express = require("express");
const axios = require("axios");
const router = express.Router();
const sizePredictorRouter = express.Router();
const {
  getSizePredictor,
} = require("../controllers/sizePredictorController.js");

sizePredictorRouter.post("/sizePredictor", getSizePredictor);


module.exports =  sizePredictorRouter;

// New ML prediction route via Python
router.post("/predict-ml", async (req, res) => {
  try {
    const { height, weight } = req.body;

    const response = await axios.post("http://127.0.0.1:8000/predict", {
      height,
      weight,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("ML Prediction failed:", error.message);
    res.status(500).json({ error: "Failed to get ML prediction" });
  }
});

module.exports = router;