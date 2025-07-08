const companySchema = require("../../../model/companyModel.js");
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const userSchema = require("../../../model/userModel.js");
const tshirtMeasurementSchema = require("../../../model/tshirtMeasurement.js");
require("dotenv").config();
const generateToken = require("../../../utils/generateToken.js");

const companyRegistration = async (req, res) => {
  try {
    const { name, email, address, contactNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingCompany = await companySchema.find({ email: email });
    if (existingCompany.length) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const newCompany = new companySchema({
      name: name,
      email: email,
      contact_number: contactNumber,
      password: hashedPassword,
      address: address,
    });
    const saveCompany = await newCompany.save();
    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const companyLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await companySchema.findOne({ email: email })
    if (company == null) {
      return res.status(404).json({ error: "Company not found" });
    }
    const passwordMatch = await bcrypt.compare(password, company.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password or email" });
    }
    if (passwordMatch) {
      let companyJsObject = company.toObject();
      const { password, ...responseCompany } = companyJsObject;
      return res
        .status(200)
        .json({ message: "Authentication successful", companyDetails: responseCompany });
    }
    res.status(401).json({
      status: false,
      message: "Authentication failed!",
    });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllCompany = async (req, res) => {
  try {
    const companyData = await companySchema.find();
    return res.status(201).json({ companies: companyData });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all company users

const getAllCompanyUsers = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }
    const companyUsers = await userSchema.find({ company: companyId });
    if (companyUsers.length === 0) {
      return res.status(404).json({ error: "No users found in this company" });
    }
    return res.status(201).json({ users: companyUsers });
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message });
  }
};

const getCompany = async (req, res) => {
  try {
    const companyId = req.params.id
    const companyData = await companySchema.find({ _id: companyId });
    const companyEmps = await userSchema.find({ company: { $regex: new RegExp(companyData[0].name, 'i') } });
    return res.status(201).json({ companyData: companyData, companyEmps: companyEmps });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message });
  }
};

const saveEmployeeEmails = async (req, res) => {
  try {
    const companyName = req.params.companyName
    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const emailFileBuffer = req.files['emailsFile'][0].buffer;
    const emailData = xlsx.read(emailFileBuffer, { type: 'buffer' });
    const emailSheet = emailData.SheetNames[0];
    const emailJsonData = xlsx.utils.sheet_to_json(emailData.Sheets[emailSheet]);

    for (const userEmail of emailJsonData) {
      userEmail.company = companyName;
      userEmail.active = true;
      await userSchema.updateOne(
        { email: userEmail.email },
        { $set: userEmail },
        { upsert: true }
      );
    }
    return res.status(201).json({ message: "User details inserted or updated successfully." });
  } catch (error) {
    console.error("Error saving employee emails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const saveTshirtDetails = async (req, res) => {
  try {
    const companyId = req.params.companyId; // Extract the company ID from the request parameters.

    // Check if a file is uploaded and if the file is named 'tshirtFile'.
    if (!req.files || !req.files['tshirtFile']) {
      return res.status(400).json({ error: 'No file uploaded' }); // Return a 400 error if no file is uploaded.
    }

    const tshirtFileBuffer = req.files['tshirtFile'][0].buffer; // Get the buffer of the uploaded file.
    const tshirtData = xlsx.read(tshirtFileBuffer, { type: 'buffer' }); // Read the Excel file using the buffer.
    const tshirtSheet = tshirtData.SheetNames[0]; // Get the name of the first sheet in the Excel file.
    const tshirtJsonData = xlsx.utils.sheet_to_json(tshirtData.Sheets[tshirtSheet]); // Convert the sheet data to JSON.
    // console.log(tshirtJsonData)
    // Find existing T-shirt sizes in the database for the specified company ID.
    const tshirtSizes = await tshirtMeasurementSchema.find({ companyId: companyId });
    if (tshirtSizes.length == 0) {
      // If no existing sizes are found, create new records with the uploaded data.
      await tshirtMeasurementSchema.create(tshirtJsonData.map(tshirt => ({
        brand_Name: tshirt.Name,
        brand_Size: tshirt.Size,
        category: tshirt.Category,
        chest_Size: tshirt["Chest size in Inch"],
        shoulder_Length: tshirt["Shoulder Length in Inch"],
        front_Size: tshirt["Front Size in Inch"],
        companyId: companyId,
      })));
    } else {
      // If existing sizes are found, delete them and replace with new data.
      await tshirtMeasurementSchema.deleteMany({ companyId: companyId });
      await tshirtMeasurementSchema.create(tshirtJsonData.map(tshirt => ({
        brand_Name: tshirt.Name,
        brand_Size: tshirt.Size,
        category: tshirt.Category,
        chest_Size: tshirt["Chest size in Inch"],
        shoulder_Length: tshirt["Shoulder Length in Inch"],
        front_Size: tshirt["Front Size in Inch"],
        companyId: companyId,
      })));
    }

    // Respond with a success message.
    return res.status(201).json({ message: "T-shirt details inserted or updated successfully." });
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error.
    console.error("Error processing T-shirt data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTshirtDetails = async (req, res) => {
  const companyId = req.params.companyId; // Extract the company ID from the request parameters.

  try {
    // Find T-shirt measurements in the database for the specified company ID.
    const tshirtMeasurements = await tshirtMeasurementSchema.find({ companyId: companyId });

    if (tshirtMeasurements.length === 0) {
      // If no measurements are found, fetch default T-shirt measurements.
      const defaultTshirtMeasurements = await tshirtMeasurementSchema.find({ companyName: 'Default Company' });
      return res.status(200).json({ tshirtSizes: defaultTshirtMeasurements }); // Respond with default measurements.
    } else {
      // Respond with the found T-shirt measurements for the specified company.
      return res.status(200).json({ tshirtSizes: tshirtMeasurements });
    }
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error.
    console.error("Error fetching T-shirt details:",error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const generateLink = async (req, res) => {
  const companyId = req.params.companyId; // Assuming you have a userId for the user
  const generatedLink = `${process.env.FRONTEND_DOMAIN}/user/email/verification/${companyId}`;
  res.json({ link: generatedLink });

};

module.exports = {
  companyRegistration,
  getAllCompany,
  getCompany,
  saveEmployeeEmails,
  generateLink,
  companyLogin,
  saveTshirtDetails,
  getTshirtDetails,
  getAllCompanyUsers,
};