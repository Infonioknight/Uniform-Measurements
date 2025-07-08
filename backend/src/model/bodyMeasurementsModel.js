const mongoose = require("mongoose");

const bodyMeasurementSchema = new mongoose.Schema({
    chest: { type: Number },
    waist: { type: Number},
    shoulder: { type: Number },
    inseam: { type: Number },
    outseam: { type: Number},
    neckCircumference: { type: Number }, // Optional
    height: {type:Number},
    weight: {type:Number},
    fullbodyWearSize:{type:String},
    upperbodyWearSize:{type:String},
    lowerbodyWearSize:{type:String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
},
  
  { timestamps: true }
);

module.exports = mongoose.model('BodyMeasurements', bodyMeasurementSchema);
