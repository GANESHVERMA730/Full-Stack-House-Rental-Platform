const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Store file in memory as a Buffer, then stream it to Cloudinary manually.
// This avoids multer-storage-cloudinary entirely and works with multer v2.
const storage = multer.memoryStorage();

/**
 * Upload a buffer to Cloudinary.
 * Returns a Promise that resolves to { url, filename }.
 */
const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "wanderlust_DEV",
        allowed_formats: ["png", "jpg", "jpeg"],
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, filename: result.public_id });
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Delete an image from Cloudinary by public_id.
 */
const deleteFromCloudinary = async (filename) => {
  if (filename) {
    await cloudinary.uploader.destroy(filename);
  }
};

module.exports = { cloudinary, storage, uploadToCloudinary, deleteFromCloudinary };