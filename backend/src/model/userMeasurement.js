const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
    chest_inch: {
         type: Number 
        },
    shoulder_inch: { 
        type: Number 
    },
    front_Length_inch: { 
        type: Number 
    },
    waist_inch:{
        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Measurement", measurementSchema);