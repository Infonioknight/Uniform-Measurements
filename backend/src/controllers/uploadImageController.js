const {cloudinary} = require('../utils/cloudinary');

const sharp = require("sharp");

const cloudinaryUploadImage = async (req, res) => {
  const image = req.file; // Access the single file from the request

  if (!image) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Resize the image using sharp
    const resizedImageBuffer = await sharp(image.buffer)
      .resize(1000, 1000, { // Adjust dimensions as per your requirement
        fit: sharp.fit.cover, // Ensures the image fills the dimensions
        position: sharp.strategy.entropy, // Focus on the most "interesting" part of the image
      })
      .toFormat("jpeg") // Convert to JPEG for optimal size
      .jpeg({ quality: 80 }) // Adjust quality for balance between size and quality
      .toBuffer();

    // Convert resized buffer to base64
    const base64Image = resizedImageBuffer.toString("base64");

    // Get MIME type explicitly (as we convert to JPEG, this is fixed)
    const mimeType = "image/jpeg";

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`, {
      folder: "products", // Cloudinary folder name
    });

    // Respond with the URL of the uploaded image
    res
      .status(200)
      .json({ message: "Image uploaded successfully", url: result.secure_url, imageId: result.public_id });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// delete image
const deleteImage = async (req, res) => {
  const { folder, imageId } = req.params;
  const publicId = `${folder}/${imageId}`;
  try {
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Respond with success message
    res.status(200).json({ message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ message:  error.message });
  }
};

module.exports = {cloudinaryUploadImage, deleteImage};
