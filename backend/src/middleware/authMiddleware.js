const jwt = require('jsonwebtoken');
const userSchema = require('../model/userModel.js');
const mongoose = require('mongoose');

const protect = async (req, res, next) => {
  let token = req.cookies.mbmJwtToken;
  

  // Check if user is authenticated with Passport
  if (req.isAuthenticated()) {
    // console.log('User is authenticated with Passport');
    return next();
  }

  // If no token and not authenticated with Passport
  if (!token && !req.isAuthenticated()) {
    console.log('no token and request')
    return res.status(400).json({
      message: "Log in to continue",
    });
  }

  // Verify JWT token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userSchema.findById(decoded.user._id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // console.log('User is authenticated with JWT');
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({
      message: 'Not authorized, token failed',
    });
  }
};


const ensureGuest = (req, res, next) => {
 
  const token = req?.cookies?.mbmJwtToken;
  
  if (token || req.isAuthenticated()) {
    return res.status(400).json({
      message: "You are already logged in. You need to be a guest."
    });
  }
  // console.log('User is not authenticated');
  next();
};


const ensureSeller = async (req, res, next) => {
  // check the JWT token
  const token = req?.cookies?.mbmJwtToken;

  if (!token && !req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

   // Check if the user is authenticated via Passport.js
   if (req.isAuthenticated() && req.user.role !== "customer") {
    // console.log('User is a seller via Passport.js');
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userSchema.findById(decoded.user._id);

    if (req.user && req.user.role !== 'customer') {
      // console.log('User is an seller via JWT');
      return next();
    } else {
      return res.status(403).json({ message: 'You are not an Seller' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


//ensure admin
const ensureAdmin = async (req, res, next) => {
  // check the JWT token
  const token = req?.cookies?.mbmJwtToken;
  const reqEmail = req?.body?.email;
  const isAdmin = await userSchema.find({"email":reqEmail})
  // console.log(isAdmin[0].role) 

if ((!token && !req.isAuthenticated()) && isAdmin[0].role != "admin") {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

   // Check if the user is authenticated via Passport.js
   if (req?.isAuthenticated() && req?.user?.role === "admin" ) {
    // console.log('User is an admin via Passport.js');
    return next();
  }

  try {
    

    if (isAdmin[0].role === "admin") {
      // console.log('User is an admin via JWT');
      return next();
    }else if(token){
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await userSchema.findById(decoded.user._id);
      if(req.user && req.user.role === 'admin'){
        console.log('User is an admin via Email');
        return next();
  
      }
    } else {
      return res.status(403).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


// Function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ObjectId',
    });
  }
  // console.log("Object id is valid")
  // If the ID is valid, continue to the next middleware or route handler
  next();
};


module.exports =  { protect, ensureGuest, ensureSeller, validateId, ensureAdmin };