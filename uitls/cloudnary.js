import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

// Your Cloudinary configuration (no changes needed here)
cloudinary.config({
  cloud_name: process.env.SECRET_KEY_CLOUD_NAME,
  api_key: process.env.SECRET_KEY_API_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_KEY_CLOUD_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  // console.log(buffer, "buffer");
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "AcademiaLink", // You can keep your folder configuration
      },
      (error, result) => {
        if (error) {
          console.error("Error in Cloudinary stream:", error);
          return reject(error);
        }
        // Resolve with the necessary data
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    // Write the buffer to the stream and end it
    uploadStream.end(buffer);
  });
};

export default uploadToCloudinary;
