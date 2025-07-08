const express = require("express");
const adminRouter = express.Router();
const { adminLogin, getAllUsers } = require("../controllers/admin/adminController");
const {ensureAdmin,  protect,
    ensureSeller,
    ensureGuest,
    validateId} =  require("../middleware/authMiddleware.js");
const { adminDeleteUser } = require("../controllers/userController.js");

adminRouter.post("/admin/login",ensureAdmin, adminLogin);
adminRouter.get("/admin/users", protect, ensureAdmin, getAllUsers);
adminRouter.delete('/users/:id', protect, ensureAdmin, validateId, adminDeleteUser);



module.exports = adminRouter;



