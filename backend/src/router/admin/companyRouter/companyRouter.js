const express = require("express");
const adminCompanyRouter = express.Router();
const multer = require("multer");
const {
  companyRegistration,
  getAllCompany,
  getCompany,
  saveEmployeeEmails,
  generateLink,
  companyLogin,
  getAllCompanyUsers,
  saveTshirtDetails,
  getTshirtDetails,
} = require("../../../controllers/admin/campanyController/adminCompanyController.js");
const {ensureAdmin,  protect,
  ensureSeller,
  ensureGuest,
  validateId} =  require('../../../middleware/authMiddleware.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminCompanyRouter.get("/company/:id", ensureAdmin, validateId, getCompany)
adminCompanyRouter.get("/company", ensureAdmin, getAllCompany)
adminCompanyRouter.post("/company", ensureAdmin, companyRegistration)
adminCompanyRouter.post("/company/login",companyLogin)
adminCompanyRouter.post("/company/emails/upload/:companyName",upload.fields([{ name: 'emailsFile' }]),saveEmployeeEmails)
adminCompanyRouter.post("/company/tshirts/upload/:companyId", upload.fields([{name: 'tshirtFile'}]), saveTshirtDetails)
adminCompanyRouter.get("/company/generateLink/:companyId",generateLink)
adminCompanyRouter.get("/company/tshirts/:companyId", getTshirtDetails);
adminCompanyRouter.get("/company/users/:companyId", ensureAdmin, validateId, getAllCompanyUsers)


module.exports =  adminCompanyRouter;