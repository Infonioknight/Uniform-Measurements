const mongoose = require('mongoose');

const sellerRequestSchema = new mongoose.Schema({
  shop_name: { type: String, required: true },
  email: { type: String, required: true },
  road: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pin_code: { type: String, required: true },
  profile_image: { type: String, required: true },
  selectedItems: { type: [String], required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  details: [
    {
      name: { type: String, required: false },
      email: { type: String, required: false },
    },
  ]

}, { timestamps: true });


module.exports = mongoose.model("SellerRequest", sellerRequestSchema);