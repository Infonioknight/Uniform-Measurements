const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getSizePredictor = async (req, res) => {
  try {
    const { weight, height, fitPreference = 1, wearType, gender } = req.body;

    // Constants for validation
    const WEAR_TYPES = ["Full Bodywear", "Upper Bodywear", "Lower Bodywear"];
    const GENDERS = ["Male", "Female"];
    const UPPER_BODY_SIZES = [
      "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"
    ];
    const LOWER_BODY_SIZES = [
      "28", "30", "32", "34", "36", "38", "40", "42", "44"
    ];

    // Validate required inputs
    if (!weight || !height || !wearType || !gender) {
      return res
        .status(400)
        .json({ error: "Weight, height, wearType, and gender are required." });
    }

    // Validate weight and height ranges
    if (weight <= 0 || weight > 500) {
      return res
        .status(400)
        .json({ error: "Invalid weight. It should be between 1 and 500 kg." });
    }

    if (height <= 30 || height > 300) {
      return res
        .status(400)
        .json({ error: "Invalid height. It should be between 30 and 300 cm." });
    }

    // Validate wearType and gender values
    if (!WEAR_TYPES.includes(wearType)) {
      return res.status(400).json({
        error:
          "Invalid wearType. It should be 'Full Bodywear', 'Upper Bodywear', or 'Lower Bodywear'.",
      });
    }

    if (!GENDERS.includes(gender)) {
      return res
        .status(400)
        .json({ error: "Invalid gender. It should be 'Male' or 'Female'." });
    }

    // Prepare the prompt for Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    if (wearType === "Full Bodywear" || wearType === "Upper Bodywear") {
      prompt = `Based on the provided height (${height} cm), weight (${weight} kg), and gender (${gender}), guess the approximate upper-body clothing size from the following options: ${UPPER_BODY_SIZES.join(", ")}. Provide only the size as a single letter or abbreviation (e.g., "M", "XL"). If you are unable to determine a size, respond with "Invalid Height and Weight".`;
    } else {
      prompt = `Based on the provided height (${height} cm), weight (${weight} kg), and gender (${gender}), guess the approximate lower-body clothing size from the following options: ${LOWER_BODY_SIZES.join(", ")}. Provide only the size as a single number. If you are unable to determine a size, respond with "Invalid Height and Weight".`;
    }
    const result = await model.generateContent(prompt);
    let predictedSize = result.response.text()?.trim().toUpperCase();
    if (fitPreference === 2) {
      const currentIndex = UPPER_BODY_SIZES.indexOf(predictedSize);
      if (currentIndex !== -1 && currentIndex < UPPER_BODY_SIZES.length - 1) {
        predictedSize = UPPER_BODY_SIZES[currentIndex + 1];
      }
    }
    // Respond with predicted size
    return res.status(200).json({ predictedSize });
  } catch (error) {
    console.error("Error in getSizePredictor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSizePredictor,
};
