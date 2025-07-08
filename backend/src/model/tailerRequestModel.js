const mongoose = require('mongoose');

const tailorRequestSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    road: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pin_code: { type: String, required: true },
    profile_image: { type: String, required: true },

    // Services offered by the tailor
    services: [{
        serviceName: { type: String, required: true },  // e.g., "Stitching", "Alterations"
        price: { type: Number, required: true },
        duration: { type: String },  // e.g., "3 days", "1 week"
    }],

    // Customer feedback and rating
    ratings: {
        averageRating: { type: Number, default: 0 },
        reviews: [{
            customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }]
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },

    tailorDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true },
    },

    verification: {
        isVerified: { type: Boolean, default: false },
        verificationDate: { type: Date },
    },

    bankDetails: {
        accountName: { type: String },
        accountNumber: { type: String },
        bankName: { type: String },
        ifscCode: { type: String },
    },

    documents: {
        idProof: { type: String },  // e.g., URL to ID document
        certification: { type: String },  // e.g., URL to any certification
    },

    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },

}, { timestamps: true });

module.exports = mongoose.model("TailorRequest", tailorRequestSchema);
