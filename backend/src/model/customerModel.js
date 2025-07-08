const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: Number },
  age: { type: Number },
  chest_inch: { type: Number },
  shoulder_inch: { type: Number },
  front_Length_inch: { type: Number },
  waist_inch: { type: Number },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  SellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
module.exports = mongoose.model("coustomer", customerSchema);

