const userModel = require("../../../model/userModel");
const generateToken = require("../../../utils/generateToken");
const { 
  sendEmail, 
  registrationTemplate,
} = require("../../../utils/mailer.js");
const { generateOTP } = require("../../../utils/validateSignUp");
const bcrypt = require("bcryptjs");


const validateInput = (email, password) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
};

const findAdmin = async (email) => {
  const admin = await userModel.findOne({ email });
  if (!admin) {
    throw new Error("User not found with this email");
  }
  if(admin.isDeleted){
    return res.status(200).json({
      message: "your account was marked for deletion, Follow the instructions in your below to recover your account",
      redirectUrl: `/users/recover-account/${admin._id}`,
    });
  }
  return admin;
};

const verifyPassword = async (password, hashedPassword) => {
  const matchPassword = await bcrypt.compare(password, hashedPassword);
  if (!matchPassword) {
    throw new Error("Incorrect password");
  }
};

const handleInactiveAdmin = async (admin) => {
  const generateOtp = generateOTP();
  admin.otp = generateOtp;
  await admin.save();
  
   // Send OTP to the user's email
   const htmlContent = registrationTemplate(generateOtp, admin);
   await sendEmail(admin.email, "Email verification",  htmlContent);
  return {
    message: "Please verify your email",
    redirectUrl: "/signup/otp",
  };
};

const handleActiveAdmin = (admin, res) => {
  if (admin.role !== "admin") {
    throw new Error("User is not admin");
  }
  const responseAdmin = {
    _id: admin?._id,
    name: admin?.name,
    email: admin?.email,
    role: admin?.role,
    profile_image: admin?.profile_image,
  };
  generateToken(res, responseAdmin);
  return {
    message: "Admin Login Successfully",
    user: responseAdmin,
  };
};

module.exports = {
  validateInput,
  findAdmin,
  verifyPassword,
  handleInactiveAdmin,
  handleActiveAdmin
}