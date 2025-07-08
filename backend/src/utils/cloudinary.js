const cloudinary = require('cloudinary').v2; // Make sure to use v2 for proper configuration
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image function
const uploadFileOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    return response.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

// Delete image function
const deleteImage = async (imageId) => {
  try {
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(imageId);
    // console.log('Image deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting image:', error.message);
    throw new Error(error.message);
  }
};

// Proper export
module.exports = { cloudinary, deleteImage, uploadFileOnCloudinary };
