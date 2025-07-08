const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    index: true,
    validate: validator.isEmail,
  },
  google: {
    email: { type: String },
    name: { type: String },
  },
  number: { type: String},
  password: { type: String },
  age: { type: Number },
  address:{type:String},
  city:{type:String},
  state:{type:String},
  zipcode:{type:Number},
  country:{type:String},
  profile_image: {
    url: { type: String },       
    publicId: { type: String } 
  },
  profile:{type:String},
  height: { type: Number },
  country: { type: String },
  measurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement',
  },
  SellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  // CustomerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  active: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    
  },
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 300 * 1000), // Set to 5 minutes from now
    index: {
      expireAfterSeconds: 0,
      partialFilterExpression: { active: false },
    },
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  isDeleted: {
    type: Boolean,
    default: false,  // Indicates whether the account is marked for deletion
  },
  deletionDate: {
    type: Date,
    default: null,
  },
  deletionReasons: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("users", userSchema);
