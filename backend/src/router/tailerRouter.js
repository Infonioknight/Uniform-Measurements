const express = require("express");
const multer = require("multer")
const tailerRouter = express.Router();
const { ensureAdmin } = require("../middleware/authMiddleware.js");
const { tailorRequestForm, tailorRequestFormList } = require("../controllers/tailerController.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

tailerRouter.post("/tailer-request", upload.single("profile_image"), tailorRequestForm);
tailerRouter.get("/admin/received-tailerRequest", ensureAdmin, tailorRequestFormList);

module.exports = tailerRouter;
