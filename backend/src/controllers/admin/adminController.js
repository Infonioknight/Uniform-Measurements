const {
  validateInput,
  findAdmin,
  verifyPassword,
  handleActiveAdmin,
  handleInactiveAdmin,
} = require("./admin_utilites_functions/admin_helper_functions");
const userSchema = require("../../model/userModel");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    validateInput(email, password); // check that given input is valid or not
    const admin = await findAdmin(email); // check user with this email is present in database or not
    await verifyPassword(password, admin.password); // check password is correct or not

    const result = admin.active // check if user is verified or not
      ? handleActiveAdmin(admin, res) // verified then this runs
      : await handleInactiveAdmin(admin); // unverified then this runs

    return res.status(200).json(result); // if all things are good to go then result return
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
    return res.status(200).json({users});
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllUsers,
};
