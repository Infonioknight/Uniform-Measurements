const tailorRequestSchema = require("../model/tailerRequestModel.js");

const tailorRequestForm = async (req, res) => {

    try {
        const {
            shop_name,
            road,
            city,
            state,
            country,
            pin_code,
            profile_image,
            services,
            tailorDetails,
        } = req.body;

        // Check if the uploaded profile image is present
        if (!profile_image) {
            return res.status(400).json({ error: "Profile image is required" });
        }

        // Validate required fields
        if (!shop_name || !road || !city || !state || !country || !pin_code || !services || !tailorDetails) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Prepare data for saving
        const requestData = {
            shop_name,
            road,
            city,
            state,
            country,
            pin_code,
            profile_image,
            services: Array.isArray(services) ? services : JSON.parse(services),
            tailorDetails: tailorDetails,
        };

        // Check if the email exists in tailorDetails, update if it does, otherwise create a new request
        let tailorRequest;
        if (tailorDetails.email) {
            tailorRequest = await tailorRequestSchema.findOneAndUpdate(
                { "tailorDetails.email": tailorDetails.email },
                { ...requestData, status: 'pending' },
                { new: true, runValidators: true }
            );
        }

        // If no existing request was found, create a new one
        if (!tailorRequest) {
            tailorRequest = new tailorRequestSchema({ ...requestData, status: 'pending' });
            await tailorRequest.save();
        }

        return res.status(201).json({
            message: "Tailor request submitted/updated successfully!",
            request: tailorRequest,
        });
    } catch (error) {
        console.error("Error saving tailor request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Tailers request form list

const tailorRequestFormList = async (req, res) => {
    try {
        // Find all tailor requests with status 'pending'
        const pendingRequests = await tailorRequestSchema.find({ status: 'pending' });

        return res.status(200).json({
            message: "Pending tailor requests retrieved successfully!",
            requests: pendingRequests,
        });
    } catch (error) {
        console.error("Error retrieving pending tailor requests:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    tailorRequestForm,
    tailorRequestFormList
}