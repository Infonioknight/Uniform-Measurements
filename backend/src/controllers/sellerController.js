const customerSchema = require("../model/customerModel.js");
const fabricSchema = require("../model/fabricModel.js");
const sizeChartSchema = require("../model/sizeChartModel.js");
const sharp = require("sharp");
const fabricCategorySchema = require("../model/sellerFabricCategory.js");
const userSchema = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const { generateOTP } = require("../utils/validateSignUp.js");
const generateToken = require("../utils/generateToken.js");
const createUniqueId = require("../utils/createUniqueId.js");
const sellerRequestSchema = require("../model/sellerRequestModel.js")
const { deleteImage } = require("../utils/cloudinary.js");
const {
  sendEmail,
  registrationTemplate,

} = require("../utils/mailer.js");

// Add Customer
const addCustomer = async (req, res) => {
  try {
    const {
      name,
      phone,
      age,
      email,
      chestSize,
      shoulderSize,
      waistSize,
      frontLength,
      gender,
    } = req.body;
    const sellerId = req.params.id;

    if (!name || !email || !phone || !age || !sellerId || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const customer = new customerSchema({
      name,
      email,
      phone,
      age,
      gender,
      chest_inch: chestSize,
      shoulder_inch: shoulderSize,
      front_Length_inch: frontLength,
      waist_inch: waistSize,
      SellerId: sellerId,
    });

    const saveUser = await customer.save();
    // returned saved user so i can store it in the redux store
    return res.status(200).json({
      message: "Customer added successfully",
      customer: saveUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get All Customers
const allCustomers = async (req, res) => {
  try {
    const sellerId = req.params.id;

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const customers = await customerSchema
      .find({ SellerId: sellerId })
      .sort({ createdAt: -1 });
    return res.status(200).json({ customers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a Single Customer
const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerid;
    const sellerId = req.params.sellerId;

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const userData = await customerSchema.findOne({ _id: customerId });

    if (!userData) {
      return res.status(404).json({ error: "Customer not found" });
    }

    let userJsObject = userData.toObject();
    const { password, ...responseUser } = userJsObject;
    let fabricList = [];
    if (
      responseUser.chest_inch ||
      responseUser.shoulder_inch ||
      responseUser.front_Length_inch
    ) {
      fabricList = await sizeChartSchema.find({
        chest: {
          $gte: responseUser.chest_inch,
          $lte: responseUser.chest_inch + 2,
        },
        shoulder: {
          $gte: responseUser.shoulder_inch,
          $lte: responseUser.shoulder_inch + 2,
        },
        SellerId: sellerId,
      });

      if (responseUser.waist_inch) {
        const bottomWear = await sizeChartSchema.find({
          waist: {
            $gte: responseUser.waist_inch,
            $lte: responseUser.waist_inch + 1,
          },
          SellerId: sellerId,
        });
        fabricList.push(...bottomWear);
      }
    }
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const categories = await fabricCategorySchema.find({ SellerId: sellerId });

    return res.status(200).json({
      customer: responseUser,
      productList: fabricList,
      categories: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const {
      name,
      email,
      phone,
      age,
      chest_inch,
      shoulder_inch,
      front_Length_inch,
      waist_inch,
    } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Update only provided fields
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (age) updatedFields.age = age;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;
    if (waist_inch) updatedFields.waist_inch = waist_inch;
    if (chest_inch) updatedFields.chest_inch = chest_inch;
    if (shoulder_inch) updatedFields.shoulder_inch = shoulder_inch;
    if (front_Length_inch) updatedFields.front_Length_inch = front_Length_inch;

    const updatedCustomer = await customerSchema.findByIdAndUpdate(
      customerId,
      updatedFields,
      { new: true } // Return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    const deleteCustomerByID = await customerSchema.findByIdAndDelete(
      req.params.id
    );

    if (!deleteCustomerByID) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add Fabric Stock
const addFabricStock = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const {
      fabricName,
      Brand,
      Size,
      Color,
      Description,
      Price,
      Category,
      gender,
      fit_Type,
      wear_type,
      Discount,
      Images,
    } = req.body;

    // Validate required fields
    if (
      !fabricName ||
      !Brand ||
      !Size ||
      !Color ||
      !Description ||
      !Price ||
      !gender ||
      !fit_Type ||
      !Category ||
      !sellerId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create new fabric stock document
    const newStock = new fabricSchema({
      FabricName: fabricName,
      Brand,
      Size,
      Color,
      Description,
      Price,
      Category,
      gender,
      fitType: fit_Type,
      Images,
      wearType: wear_type,
      Discount: Discount || 0,
      Category,
      SellerId: sellerId,
    });

    // Save document to database
    await newStock.save();

    return res.status(201).json({
      message: "Stock added successfully",
      product: newStock,
    });
  } catch (error) {
    console.error("Error adding stock:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// Get Fabric Stock by ID
const getFabricStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    if (!stockId) {
      return res.status(400).json({ error: "Stock ID is required" });
    }

    const product = await fabricSchema.findOne({ _id: stockId });

    if (!product) {
      return res.status(404).json({ error: "Fabric stock not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Fabric Stocks
const getFabricStocks = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const products = await fabricSchema.find({ SellerId: sellerId });
    const categories = await fabricCategorySchema.find({ SellerId: sellerId });
    if (products.length === 0) {
      return res.status(404).json({ message: "No fabric stocks found" });
    }

    return res.status(200).json({ products: products, categories: categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update Fabric Stock
const updateFabricStock = async (req, res) => {

  try {
    const sellerId = req.params.sellerId;
    const {
      _id,
      fabricName,
      Brand,
      Size,
      Color,
      Description,
      Price,
      Category,
      gender,
      fit_Type,
      wear_type,
      Discount,
      Images,
    } = req.body;

    // Find the existing fabric stock to get the current image
    const existingFabric = await fabricSchema.findById(_id);
    if (!existingFabric) {
      return res.status(404).json({ error: 'Fabric stock not found' });
    }

    // Delete the previous image if the Image has changed
    if (existingFabric.Images?.length > 0) {
      try {
        for (const image of existingFabric.Images) {
          if (image.publicId) {
            await deleteImage(image.publicId); // Call the Cloudinary delete function
          }
        }
      } catch (err) {
        console.error('Error deleting images:', err.message);
        return res.status(500).json({ error: 'Error deleting associated images' });
      }
    }

    // Update fabric stock
    const updatedMenFabric = await fabricSchema.findByIdAndUpdate(
      _id,
      {
        FabricName: fabricName,
        Brand,
        Size,
        Color,
        Description,
        Price,
        Category,
        gender,
        fitType: fit_Type,
        Images,
        wearType: wear_type,
        Discount: Discount || 0,
        Category,
      },
      { new: true }
    );

    if (!updatedMenFabric) {
      return res.status(404).json({ error: 'Fabric stock not found' });
    }

    return res.status(200).json({
      message: 'Fabric stock updated successfully',
      product: updatedMenFabric,
    });
  } catch (error) {
    console.error('Error updating fabric stock:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete Fabric Stock
const deleteFabricStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    // Validate stock ID
    if (!stockId) {
      return res.status(400).json({ error: 'Stock ID is required' });
    }

    // Find the fabric stock to get image details
    const fabricStock = await fabricSchema.findById(stockId);
    if (!fabricStock) {
      return res.status(404).json({ error: 'Fabric stock not found' });
    }

    // Delete image from Cloudinary if it exists
    if (fabricStock.Images?.length > 0) {
      try {
        for (const image of fabricStock.Images) {
          if (image.publicId) {
            await deleteImage(image.publicId); // Call the Cloudinary delete function
          }
        }
      } catch (err) {
        console.error('Error deleting images:', err.message);
        return res.status(500).json({ error: 'Error deleting associated images' });
      }
    }

    // Delete fabric stock from database
    await fabricSchema.findByIdAndDelete(stockId);

    return res.status(200).json({ message: 'Fabric stock and associated image deleted successfully' });
  } catch (error) {
    console.error('Error deleting fabric stock:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get Product List by Brand and Size
const getProductListByBrandSize = async (req, res) => {
  try {
    const brandSizesList = req.body;
    const sellerId = req.params.sellerId;

    if (
      !brandSizesList ||
      !Array.isArray(brandSizesList) ||
      brandSizesList.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Brand sizes list is required and must be an array" });
    }

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const matchingProducts = await Promise.all(
      brandSizesList.map(async (size) => {
        const products = await fabricSchema.find({
          Size: {
            $elemMatch: {
              size: { $regex: new RegExp(`^${size.brandSize}$`, "i") },
              stock: { $gt: 0 }, // Ensure stock is greater than 0
            },
          },
          Brand: { $regex: new RegExp(size.brandName, "i") }, // Match brand
          SellerId: sellerId, // Match seller
        });

        // Enhance each product with the matched size
        const enhancedProducts = products.map((product) => {
          const matchedSize = product.Size.find(
            (s) =>
              new RegExp(`^${size.brandSize}$`, "i").test(s.size) && s.stock > 0
          );

          return {
            ...product.toObject(), // Convert Mongoose document to plain object
            matchedSize: matchedSize?.size, // Add the matched size
            matchedStock: matchedSize?.stock, // Add the matched stock
          };
        });

        return enhancedProducts;
      })
    );

    const flattenedProducts = matchingProducts.flat();

    if (flattenedProducts.length === 0) {
      return res.status(200).json({ message: "No products found" });
    }

    return res.status(200).json({ productList: flattenedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Save the Brand Size
const saveBrandSize = async (req, res) => {
  try {
    const fabricData = req.body;
    const sellerId = req.params.sellerId;

    if (!fabricData || !sellerId) {
      return res
        .status(400)
        .json({ error: "Fabric data and Seller ID are required" });
    }

    fabricData.SellerId = sellerId
    const saveSize = await sizeChartSchema.create(fabricData)
    return res.status(201).json({ message: "Brand Size Added Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Save Fabric Category
const saveFabricCategory = async (req, res) => {
  try {
    const { fabricCategory } = req.body;
    const { sellerId } = req.params;

    if (!fabricCategory || !sellerId) {
      return res
        .status(400)
        .json({ error: "Fabric category and Seller ID are required" });
    }

    const category = new fabricCategorySchema({
      FabricCategory: fabricCategory,
      SellerId: sellerId,
    });

    await category.save();

    return res.status(200).json({ category: category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete the Fabric Category
const deleteFabricCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const deletedFabricCategory = await fabricCategorySchema.findByIdAndDelete(
      categoryId
    );
    if (!deletedFabricCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Fabric Category
const getFabricCategory = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const categories = await fabricCategorySchema.find({ SellerId: sellerId });

    if (!categories.length) {
      return res.status(404).json({ error: "No categories found" });
    }

    const joinTopBottomWear = await sizeChartSchema.find({
      SellerId: sellerId,
    });

    return res
      .status(200)
      .json({ Categories: categories, brandList: joinTopBottomWear });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the Fabric Brand
const getFabricBrand = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const joinTopBottomWear = await sizeChartSchema.find({
      SellerId: sellerId,
    });

    if (!joinTopBottomWear.length) {
      return res.status(404).json({ error: "No brand found" });
    }
    return res
      .status(200)
      .json({ brandList: joinTopBottomWear });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Seller login function
const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
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
      const htmlContent = registrationTemplate(generatedOtp, user);
      await sendEmail(user.email, "Email Verification", htmlContent);

      // Return a JSON response with the redirect URL
      //so the frontend can redirect the user to the OTP verification page
      return res.status(200).json({
        message: "Please verify your email",
        redirectUrl: "/signup/otp",
      });
    }

    if (user.role !== "seller" && user.role !== "admin") {

      return res.status(401).json({ message: "This is a seller login" });
    }
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

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

//======= Update fabric Brand ============

const updateFabricBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const upBrandData = req.body.body;

    if (!brandId) {
      return res.status(400).json({ error: "Brand ID is required" });
    }

    const upFabricBrand = await sizeChartSchema.findByIdAndUpdate(
      brandId,
      { $set: upBrandData },
      { new: true, runValidators: true }
    );
    if (!upFabricBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    return res.status(200).json({
      message: "Brand updated successfully",
      customer: upFabricBrand,
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Fabric Brand
const deleteFabricBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    if (!brandId) {
      return res.status(400).json({ error: "Brand ID is required" });
    }
    let deletedFabricBrand = await sizeChartSchema.findByIdAndDelete(brandId);

    if (!deletedFabricBrand) {
      return res.status(404).json({ error: "brand not found" });
    }

    return res.status(200).json({ message: "brand deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get Seller
const getSellerCustomers = async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }
    const customers = await customerSchema.find({ SellerId: sellerId });
    if (!customers.length) {
      return res.status(404).json({ error: "Seller not found" });
    }
    return res.status(200).json({ customers, length: customers.length });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
};

const registerSeller = async (req, res) => {
  try {
    const { name, number, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sellerExists = await userSchema.findOne({ email: email });
    if (sellerExists) {
      return res
        .status(400)
        .json({ error: "Seller already exists with this email" });
    }
    const sellerId = createUniqueId();
    const newSeller = new userSchema({
      name: name,
      email: email,
      contact_number: number,
      password: hashedPassword,
      role: "seller",
      sellerId: sellerId,
    });
    const saveSeller = await newSeller.save();
    return res
      .status(200)
      .json({ message: "Seller Registration was successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Seller Request Form
const sellerRequestForm = async (req, res) => {
  try {
    const {
      shop_name,
      road,
      state,
      city,
      pin_code,
      selectedItems,
      details,
      profile_image,
    } = req.body;

    // Validate required fields
    if (!shop_name || !road || !state || !city || !pin_code || !selectedItems) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate profile image
    if (!profile_image) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    // Parse selectedItems if needed
    const itemsArray = Array.isArray(selectedItems) ? selectedItems : JSON.parse(selectedItems);

    // Ensure details is an array
    // if (!Array.isArray(details) || details.length === 0) {
    //   return res.status(400).json({ error: "Details must be a non-empty array" });
    // }

    const requestData = {
      shop_name,
      road,
      state,
      city,
      pin_code,
      profile_image: profile_image.url,
      selectedItems: itemsArray,
      status: "pending",
    };

    req.user.email ? requestData.email = req.user.email : null
    let sellerRequests = [];

    // Process each detail entry
    if (details && details.length > 0) {
      for (let detail of details) {
        if (detail?.email) {
          const updatedRequest = await sellerRequestSchema.findOneAndUpdate(
            { "details.email": detail.email },
            {
              $set: {
                "details.$.name": detail.name,
                ...requestData,
              }
            },
            { new: true, runValidators: true }
          );

          if (updatedRequest) {
            sellerRequests.push(updatedRequest);
          }
        }
      }
    }

    // If no existing request was found, create a new one
    if (sellerRequests.length === 0) {
      const newRequest = new sellerRequestSchema({
        ...requestData,
        details,
      });

      await newRequest.save();
      sellerRequests.push(newRequest);
    }

    return res.status(201).json({
      message: "Seller request submitted/updated successfully!",
      request: sellerRequests,
    });

  } catch (error) {
    console.error("Error saving seller request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sellerRequestFormList = async (req, res) => {
  try {
    // Find all seller requests with status 'pending'
    const pendingRequests = await sellerRequestSchema.find({ status: 'pending' });
    return res.status(200).json({
      message: "Pending seller requests retrieved successfully!",
      requests: pendingRequests,
    });
  } catch (error) {
    console.error("Error retrieving pending seller requests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = {
  addCustomer,
  allCustomers,
  getCustomer,
  updateCustomer,
  addFabricStock,
  updateFabricStock,
  deleteFabricStock,
  getProductListByBrandSize,
  getFabricStock,
  getFabricStocks,
  saveBrandSize,
  saveFabricCategory,
  deleteFabricCategory,
  getFabricCategory,
  loginSeller,
  deleteCustomer,
  getFabricBrand,
  deleteFabricBrand,
  getSellerCustomers,
  registerSeller,
  sellerRequestForm,
  sellerRequestFormList,
  updateFabricBrand
};
