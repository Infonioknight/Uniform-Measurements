const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true,index:true },
  password:{type:String},
  address: { type: String },
  contact_number: { type: Number},
});
module.exports = mongoose.model("companies", companySchema);
