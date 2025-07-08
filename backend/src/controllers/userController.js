const userSchema = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const companySchema = require("../model/companyModel.js");
const mongoose = require('mongoose');
const sharp = require('sharp');
require("dotenv").config()
const {
  validateUserSignUp,
  generateOTP,
} = require("../utils/validateSignUp.js");
const generateToken = require("../utils/generateToken.js");
const {
  sendEmail,
  passwordResetTemplate,
  registrationTemplate,
  accountDeletionTemplate,
  adminDeleteUserTemplate,
} = require("../utils/mailer.js");
const { storeOTP, getStoredOTP, deleteOTP } = require("../utils/optFunctions.js");
const jwt = require('jsonwebtoken')
const { uploadFileOnCloudinary } = require('../utils/cloudinary.js')

const BugReport = require("../model/bugReportModel.js");


// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, number, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find if user exists either as local or Google user
    const existingUser = await userSchema.findOne({
      $or: [{ email: email }, { "google.email": email }],
    });

    if (existingUser) {
      // If user exists with Google but not locally, update Google user
      if (existingUser.google && !existingUser.password) {
        existingUser.password = hashedPassword;
        existingUser.active = true;
        existingUser.name = name;
        existingUser.email = email;
        existingUser.number = number;
        await existingUser.save();
        const responseUser = {
          active: existingUser.active
        }
        return res.status(200).json({ message: "Registration successful", user: responseUser });
      }
      // If user exists locally, return conflict response
      return res.status(400).json({ message: "Email already registered" });
    }

    // If user does not exist, create a new user
    const generatedOtp = generateOTP();
    const emailDomainRegex = /@([^.]+)\.([^.]+)$/;
    const emailDomain = email.match(emailDomainRegex);

    let newUser = {
      name: name,
      email: email,
      number: number,
      password: hashedPassword,
      otp: generatedOtp,
    };

    if (role) {
      newUser.role = role;
    }

    if (emailDomain) {
      const [, domain] = emailDomain;
      if (domain !== "gmail" && domain !== "hotmail" && domain !== "outlook") {
        newUser.company = domain;
      }
    }

    // Save the new user
    const createdUser = await userSchema.create(newUser);
    const responseUser = {
      active: createdUser.active
    }

    // Send OTP to the user's email
    const htmlContent = registrationTemplate(generatedOtp, createdUser);
    await sendEmail(email, "Email verification", htmlContent);
    return res.status(201).json({ message: "OTP sent to your email", user: responseUser });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// Resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const newOtp = generateOTP();

    user.otp = newOtp;
    await user.save();

    // Send OTP to the user's email
    const htmlContent = registrationTemplate(newOtp, user);
    await sendEmail(email, "Email verification", htmlContent);

    return res.status(200).json({ message: "New OTP sent to your email" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};


//verify Email
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const [isValid, response] = await validateUserSignUp(email, otp);

    if (!isValid) {
      return res.status(401).json({ message: response });
    }

    return res
      .status(200)
      .json({ message: "Registration successful", role: response.role });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};


// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Send OTP to the user's email
    const htmlContent = passwordResetTemplate(resetCode, user);
    await sendEmail(email, "Password Reset", htmlContent);
    storeOTP(email, resetCode); // Store OTP in the otpStore
    res.status(200).json({ message: 'Reset code sent to email' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: error.message });
  }
};


// verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const storedOTP = getStoredOTP(email); // Retrieve OTP from the otpStore
    if (storedOTP === otp) {
      deleteOTP(email); // Remove OTP after successful verification
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};



// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isDeleted) {
      return res.status(200).json({
        message: "your account was marked for deletion, Follow the instructions in your below to recover your account",
        redirectUrl: `/users/recover-account/${user._id}`,
      });
    }


    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }

    // Check if the user has verified their email
    if (!user.active) {
      const generatedOtp = generateOTP();
      user.otp = generatedOtp;
      await user.save();
      // Send OTP to the user's email
      const htmlContent = registrationTemplate(generatedOtp, user);
      await sendEmail(user.email, "Email verification", htmlContent);

      // Return a JSON response with the redirect URL
      //so the frontend can redirect the user to the OTP verification page
      return res.status(200).json({
        message: "Please verify your email",
        redirectUrl: '/signup/otp',
      });
    } else {
      // Construct response user object
      const responseUser = {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        profile_image: user?.profile_image,
      };


      generateToken(res, responseUser);

      return res.status(200).json({
        message: "Authentication successful",
        user: responseUser,
      });

    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Logout user
const logOut = async (req, res) => {
  try {
    const token = req.cookies?.mbmJwtToken || "";
    const googleToken = req.cookies?.mbmPassportToken || "";

    if (token) {
      // Clear the JWT token
      res.cookie('mbmJwtToken', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the token immediately
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });

      console.log('JWT token cleared');
      return res.status(200).json({ message: "Logged out successfully" });

    } else if (googleToken) {
      // Logout user and destroy session
      req.logout(function (err) {
        if (err) {
          console.error('Error during logout:', err.message);
          return res.status(500).json({ message: 'Error during logout' });
        }

        req.session.destroy(function (err) {
          if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error destroying session' });
          }

          res.clearCookie('mbmPassportToken'); // Clear the session cookie
          console.log('Session destroyed and cookie cleared');
          return res.status(200).json({
            message: 'User logged out successfully',
          });
        });
      });

    } else {
      return res.status(400).json({ message: "User not logged in" });
    }

  } catch (error) {
    console.log('Logout error:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find({}, {
      name: 1,
      email: 1,
      number: 1,
      age: 1,
      company: 1,
      chest_inch: 1,
      shoulder_inch: 1,
      front_Length_inch: 1,
      address: 1,
      zipcode: 1
    });

    return res.status(201).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error. Please! try again." });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await userSchema.findOne({ _id: userId }).populate("measurement");
    let userJsObject = userData.toObject();
    const { password, ...responseUser } = userJsObject;

    let fabricList;
    // if (responseUser.chest_inch != undefined || responseUser.shoulder_inch != undefined || responseUser.front_Length_inch != undefined) {
    // fabricList = await menTopfabricSchema.find({
    //   chest_inch: { $gte: responseUser.chest_inch, $lte: responseUser.chest_inch +2 },
    //   shoulder_inch: { $gte: responseUser.shoulder_inch, $lte: responseUser.shoulder_inch + 2 },
    //   front_Length_inch: { $gte: responseUser.front_Length_inch, $lte: responseUser.front_Length_inch + 2 },
    // });
    // }
    return res.status(201).json({ User: responseUser, BrandSizeList: fabricList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

//Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
console.log(req.body)
  const { name, number, age, address, city, state, zipcode, profile, profile_image, height, country } = req.body;

  const updateFields = { name, number, age, address, city, state, zipcode, height, profile, profile_image, country };

  try {
    // if (req.file) {
    //   const avatarUrl = await uploadFileOnCloudinary(req.file.path);
    //   if (avatarUrl) updateFields.profile_image = avatarUrl;
    // }
    const updatedUser = await userSchema.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ message: "Profile updated", updatedImageUrl: updatedUser.profile_image });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user', error });
  }
};

// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, number, age, address, city, state, zipcode, profile } = req.body;

//   const updateFields = { name, number, age, address, city, state, zipcode, profile };

//   try {
//     if (req.file) {
//       console.log(req.file)
//       // Use sharp to resize and process the image
//       const resizedImageBuffer = await sharp(req.file.buffer)
//         .resize(200, 200) // Resize to 200x200
//         .toBuffer(); // Convert the image to a buffer

//       // Store the processed image buffer and its content type in updateFields
//       updateFields.profile_image = {
//         data: resizedImageBuffer,
//         contentType: req.file.mimetype,
//       };
//     }

//     // Update user document with new fields, including profile image if it exists
//     const updatedUser = await userSchema.findByIdAndUpdate(id, updateFields, { new: true });

//     if (!updatedUser) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     res.status(200).send({ message: "User Profile updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error updating user', error });
//   }
// };



//authenticate user email
const authenticateUserEmail = async (req, res) => {
  try {
    const { email, companyId } = req.body;
    const userData = await userSchema.findOne({ email: email });
    if (userData == null) {
      return res.status(404).json({ error: "User not found" });
    }
    if (mongoose.Types.ObjectId.isValid(companyId)) {
      const company = await companySchema.findOne({ _id: companyId });
      if (company == null) {
        return res.status(404).json({ error: "Company not found" });
      }
      if (userData.company == company.name) {
        return res.status(200).json({ message: "Authentication successful" });
      }
    } else {
      return res.status(404).json({ error: "Company not found" });
    }
    return res.status(401).json({ error: "bad request" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveUserMenTopWear = async (req, res) => {
  try {
    const { name, age, chestSize, shoulderSize, frontLength, email, waist } = req.body;
    const user = {
      name: name,
      email: email,
      age: age,
      chest_inch: chestSize,
      shoulder_inch: shoulderSize,
      front_Length_inch: frontLength,
      waist_inch: waist,
    };
    // const saveUser = await newUser.save();
    const saveUser = await userSchema.updateOne(
      { email: email },
      { $set: user },
      { upsert: true }
    );
    return res.status(200).json({ message: "User data updated successfuliy" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//get all sellers

const getAllSellers = async (req, res) => {
  try {
    const sellers = await userSchema.find({ role: "seller" });
    if (sellers.length == 0) {
      return res.status(404).json({ message: "No sellers found" });
    }
    return res.status(201).json({
      message: "Seller list",
      sellers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//change password
// const changePassword = async (req, res) => {
//   const { email, oldPassword, newPassword } = req.body
//   try {
//     const user = await userSchema.findOne({ email: email })
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     if (user == null) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const passwordMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Incorrect password " });
//     }
//     if (passwordMatch) {
//       const generatedOtp = generateOTP();
//       const saveUser = await userSchema.updateOne(
//         { email: email },
//         { $set: { password: hashedPassword, otp: generatedOtp, active: false } },
//         { upsert: false }
//       );
//       const htmlContent = registrationTemplate(generatedOtp, saveUser);
//       await sendEmail(email, 'Email verification', htmlContent);
//       return res.status(200).json({ message: "OTP sent to your email" });
//     }
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ error: "Internal Server Error" })
//   }

// }

/* FOR CHANGING PASSWORD*/
// ======= for verify old password ======
const verifyOldPass = async (req , res) => {
  const { email , oldPass} = req.body;
  try{

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPass, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Old password" });
    }

    return res.status(200).json({ message: "Old Password is correct." });
  } catch (error) {
    
    return res.status(500).json({ error: "Internal Server Error" });
  }

}
// ======= for request otp ========
const requestOtpToChangePassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const generatedOtp = generateOTP();
    await userSchema.updateOne(
      { email },
      { $set: { otp: generatedOtp, expireAt: Date.now() + 300000 } } // Set OTP expiry to 5 minutes
    );

    const htmlContent = passwordResetTemplate(generatedOtp, user);
    await sendEmail(email, 'Your OTP for Password Change', htmlContent);

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ======= for change password ========
const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Hash and save the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userSchema.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword, otp: null } }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const sendData = async (req, res) => {

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const findUser = await userSchema.findById(req.user._id);
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    //check if user is marked for deletion and send them to the recover account page
    if (findUser.isDeleted) {
      return res.redirect(`${process.env.FRONTEND_DOMAIN}/users/recover-account/${findUser._id}`);
    }
    // Construct response user object
    const user = {
      _id: findUser?._id,
      name: findUser?.name || findUser?.google?.name,
      email: findUser?.email || findUser?.google?.email,
      role: findUser?.role,
      profile_image: findUser?.profile_image,
    };

    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.redirect(`${process.env.FRONTEND_DOMAIN}/login?token=${token}`);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const bugReportForm = async (req, res) => {

  const { name, email, report } = req.body;
  console.log(name, email, report);

  try {

    const newReport = new BugReport({
      name, email, report
    })

    await newReport.save();
    res.status(200).json({ message: "Report submitted successfully!" })

  } catch (error) {
    res.status(500).json({ message: "Error submitting report", error })
  }
}

const markAccountForDeletion = async (req, res) => {
  const { id } = req.params;
  const { password, reasons } = req.body;

  try {
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check if user is authorized to delete the account
    if (req?.user?._id.toString() !== id) {
      return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }

    // Send email to the user about account deletion
    const htmlContent = accountDeletionTemplate(user);
    const userEmail = user.email || user.google?.email;
    await sendEmail(userEmail, 'Account deletion', htmlContent);

    // Mark the account as deleted and set the deletion date
    const updatedUser = await userSchema.findByIdAndUpdate(
      { _id: id },
      {
        isDeleted: true,
        deletionDate: new Date(),
        deletionReasons: reasons,
      },
      { new: true }
    );

    // Call the logOut function to log the user out after marking for deletion
    await logOut(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Recover account
const recoverAccount = async (req, res) => {
  const { email, userId } = req.body;
  try {
    // Find the user with both userId and email
    const user = await userSchema.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided email matches either user.email or user.google.email
    if (email !== user.email && email !== user.google?.email) {
      return res.status(400).json({ message: 'Email does not match associated accounts' });
    }

    // Reset deletion date and isDeleted status
    user.deletionDate = null;
    user.isDeleted = false;
    user.deletionReasons = [];

    await user.save();

    res.status(200).json({ message: 'Account recovered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error recovering user', error: error.message });
  }
};

// Admin delete user
const adminDeleteUser = async (req, res) => {
  const { id } = req.params;
  const admin = req.user;

  try {
    // Fetch the user to be deleted
    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the requesting user is an admin
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }
    if (id.toString() === admin._id.toString()) {
      return res.status(403).json({ message: 'You cannot delete your own account. Log in as customer to delete your account' });
    }

    // Delete the user's account
    await userSchema.deleteOne({ _id: id });
    // Send notification email to the deleted user
    const emailContent = adminDeleteUserTemplate(user);
    await sendEmail(user?.email, 'Your Account has been Deleted', emailContent);

    res.status(200).json({ message: 'User account deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
};


// Admin deleted users listing
const deletedUsers = async (req, res) => {
  const admin = req.user;

  try {
    // Check if the requesting user is an admin
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to view deleted users' });
    }

    // Fetch deleted users sorted by deletion date in descending order
    const deleted_users = await userSchema
      .find({ isDeleted: true })
      .sort({ deletionDate: -1 });

    // Check if any deleted users were found
    if (!deleted_users || deleted_users.length === 0) {
      return res.status(404).json({ message: 'No deleted user found' });
    }
    // Successfully return the list of deleted users
    return res.status(200).json({ message: 'Deleted users retrieved successfully', data: deleted_users });

  } catch (error) {
    console.error('Error fetching deleted users:', error);
    res.status(500).json({ message: 'An error occurred while fetching deleted users', error: error.message });
  }
};




module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
  authenticateUserEmail,
  saveUserMenTopWear,
  verifyEmail,
  resendOtp,
  getAllSellers,
  requestOtpToChangePassword,
  changePassword,
  logOut,
  forgotPassword,
  verifyOtp,
  resetPassword,
  sendData,
  bugReportForm,
  markAccountForDeletion,
  recoverAccount,
  adminDeleteUser,
  deletedUsers,
  verifyOldPass

}