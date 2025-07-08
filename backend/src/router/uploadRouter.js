const express = require('express');
const multer = require('multer');
const { protect } = require("../middleware/authMiddleware.js");
const {cloudinaryUploadImage, deleteImage} = require("../controllers/uploadImageController");

const router = express.Router();

// Configure storage for Multer
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Define the route for file upload
router.post("/upload/image", protect, upload.single('file'), cloudinaryUploadImage);

// Define the route for file deletion

router.delete("/upload/image/:folder/:imageId", protect, deleteImage);


module.exports = router;
