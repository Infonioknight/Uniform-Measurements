const mongoose = require('mongoose');

// Define a schema for storing user clothing measurements
const sizeChartModel = new mongoose.Schema(
{
  // Name of the brand
  brandName: { 
    type: String, 
    required: true 
  },

  // Size of the clothing item according to the brand's sizing
  brandSize: { 
    type: String, 
    required: true 
  },

  // Standard size if applicable
  standardSize: { 
    type: String 
  },

  // Measurements in inches
  
  shoulder: { 
    type: Number, 
  },
  
  chest: { 
    type: Number,
  },

  length:{
    type: Number, 
  },
  
  waist: { 
    type: Number,
  },

  outseam:{
    type: Number, 
  },

  inseam:{
    type: Number, 
  },
  

  fitType: { 
    type: String 
  },

  // Gender category (e.g., Male, Female, Others)
  gender: { 
    type: String, 
    required: true 
  },

  wear: {
    type: String,
    enum: ['Upper Bodywear', 'Lower Bodywear', 'Full Bodywear'] // Enum defining allowed values for the 'role' field
  },

  // Clothing category (e.g., Shirt, Pants, etc.)
  category: { 
    type: String, 
    required: true
  },


  // Reference to the seller (if applicable)
  SellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true,
  }
},
{ timestamps: true } 
);

// Create and export the model based on the schema
module.exports = mongoose.model('sizeChartModel', sizeChartModel);