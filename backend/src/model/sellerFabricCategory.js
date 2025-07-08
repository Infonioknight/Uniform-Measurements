const mongoose = require("mongoose");

const fabricCategorySchema = new mongoose.Schema({
  FabricCategory: { type: String, required: true },
  SellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
module.exports = mongoose.model("fabricCategory", fabricCategorySchema);

