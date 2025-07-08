const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
}, { _id: false }); // Prevents creation of an _id for each size object

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },      // URL of the image
  publicId: { type: String, required: true }  // Public ID if stored on a cloud service (e.g., Cloudinary)
}, { _id: false });

const fabricSchema = new mongoose.Schema(
  {
    FabricName: { type: String, required: true }, // Fabric name
    Brand: { type: String, required: true }, // Brand name
    Size: [sizeSchema], // Available sizes and stock
    Color: { type: String, required: true }, // Color of the fabric
    Description: { type: String, required: true }, // Fabric description
    Price: { type: Number, required: true }, // Price of the fabric
    Discount: { type: Number, default: 0 }, // Discount, default is 0
    Images: {
      type: [imageSchema], // Array of image objects
      validate: [arrayLimit, '{PATH} exceeds the limit of 4 images'] // Custom validation
    },
    Category: { type: String,require:true}, // Category of fabric, default is "General"
    fitType: { type: String, default: "Regular fit" },  // Fit type, default is "Regular"
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Restricts gender values
    },
    wearType: {
      type: String,
      enum: ['Upper Bodywear', 'Lower Bodywear', 'Full Bodywear'], // Restricts wear type
    },
    SellerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',  // Reference to the User (Seller) collection
      required: true
    }
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
    collection: "fabrics" // Collection name
  }
);

// Custom validator to limit the number of images to 4
function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model("Fabric", fabricSchema);
