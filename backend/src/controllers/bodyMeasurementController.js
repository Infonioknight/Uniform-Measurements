const bodyMeasurementSchema = require("../model/bodyMeasurementsModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Constants
const UPPER_BODY_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
const LOWER_BODY_SIZES = ["28", "30", "32", "34", "36", "38", "40", "42", "44"];

// Utility: Get clothing size using Google Generative AI
async function predictClothingSize(height, weight) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Based on the provided height (${height} cm) and weight (${weight} kg), guess the approximate clothing sizes from the following options: 
- Upper-body sizes: ${UPPER_BODY_SIZES.join(", ")} 
- Lower-body sizes: ${LOWER_BODY_SIZES.join(", ")}.

Provide the result in the format: <UpperBodySize> and <LowerBodySize> (e.g., "M and 32"). If the height and weight are insufficient to determine sizes, respond with "Invalid Height and Weight".`;

        const result = await model.generateContent(prompt);
        const text = result.response.text()?.trim().toUpperCase();

        if (!text || text.includes("INVALID")) {
            return { upper: "", lower: "" };
        }

        const predicted = text.split("AND").map((s) => s.trim());

        return {
            upper: predicted[0] || "",
            lower: predicted[1] || ""
        };
    } catch (err) {
        console.error("AI Prediction Error:", err.message);
        return { upper: "", lower: "" };
    }
}

// Controller: Create or update measurement
const createUserMeasurement = async (req, res) => {
    const { userId } = req.params;
    const { chest, shoulder, waist, inseam, outseam, height, weight } = req.body;

    try {
        const existingMeasurement = await bodyMeasurementSchema.findOne({ userId });

        // Predict clothing size if height & weight are provided
        let upperbodySize = "", lowerBodySize = "";
        if (height && weight) {
            const predicted = await predictClothingSize(height, weight);
            upperbodySize = predicted.upper;
            lowerBodySize = predicted.lower;
        }

        if (!existingMeasurement) {
            const newMeasurement = await bodyMeasurementSchema.create({
                chest, shoulder, waist, inseam, outseam, height, weight,
                fullbodyWearSize: upperbodySize,
                upperbodyWearSize: upperbodySize,
                lowerbodyWearSize: lowerBodySize,
                userId
            });

            return res.status(201).json({
                message: "User measurement saved successfully",
                measurement: newMeasurement
            });
        } else {
            let upperbodySize = existingMeasurement.upperbodyWearSize || "";
            let lowerBodySize = existingMeasurement.lowerbodyWearSize || "";

            const heightChanged = height && height !== existingMeasurement.height;
            const weightChanged = weight && weight !== existingMeasurement.weight;

            // Only predict new sizes if height or weight changed
            if (heightChanged || weightChanged) {
                const predicted = await predictClothingSize(height, weight);
                upperbodySize = predicted.upper;
                lowerBodySize = predicted.lower;
            }

            await bodyMeasurementSchema.updateOne(
                { userId },
                {
                    $set: {
                        chest,
                        shoulder,
                        waist,
                        inseam,
                        outseam,
                        height,
                        weight,
                        fullbodyWearSize: upperbodySize,
                        upperbodyWearSize: upperbodySize,
                        lowerbodyWearSize: lowerBodySize
                    }
                }
            );
            const updated = await bodyMeasurementSchema.findOne({ userId });

            return res.status(200).json({
                message: "User measurement updated successfully",
                measurement: updated
            });
        }
    } catch (error) {
        console.error("Measurement Save Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller: Get user measurement
const getUserMeasurement = async (req, res) => {
    const { userId } = req.params;

    try {
        const userMeasurement = await bodyMeasurementSchema.findOne({ userId });

        if (!userMeasurement) {
            return res.status(404).json({ error: "User measurement not found" });
        }

        const {
            chest, waist, shoulder, outseam, inseam, height, weight,
            upperbodyWearSize, lowerbodyWearSize, fullbodyWearSize
        } = userMeasurement;

        return res.status(200).json({
            measurement: {
                chest, waist, shoulder, outseam, inseam, height, weight,
                upperbodyWearSize, lowerbodyWearSize, fullbodyWearSize
            }
        });
    } catch (error) {
        console.error("Fetch Measurement Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createUserMeasurement,
    getUserMeasurement
};
