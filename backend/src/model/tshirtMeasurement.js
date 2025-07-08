const mongoose = require("mongoose");

const tshirtMeasurementSchema = mongoose.Schema(
  {
    brand_Name: { type: String, required: true },
    brand_Size: { type: String, required: true },
    chest_Size: { type: Number, required: true },
    shoulder_Length: { type: Number, required: true },
    front_Size: { type: Number, required: true },
    category: { type: String, require: true },
    companyName:{type:String},
    companyId: { type: mongoose.SchemaTypes.ObjectId, ref: 'companies',  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TshirtMeasurement", tshirtMeasurementSchema);