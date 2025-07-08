const userSchema = require("../model/userModel");

// Function to validate user registration with OTP
const validateUserSignUp = async (email, otp) => {
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return [
        false,
        "Your registration details are not found. Please complete the registration again.",
      ];
    }
    if (user.otp !== otp) {
      return [false, "Invalid OTP"];
    }
 
    const updatedUser = await userSchema.findByIdAndUpdate(
      user._id,
      { active: true },
      { new: true }
    );
    return [true, updatedUser];
  };

  function generateOTP() {
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * digits.length)];
    }
    return OTP;
  } 




  module.exports = { validateUserSignUp, generateOTP };
 