import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, 
});

export async function uploadImageToCloudinary(fileBuffer, fileName) {
  try {

    const base64File = fileBuffer.toString("base64");

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64File}`, {
      folder: "payment-proofs", 
      public_id: fileName.replace(/\.[^/.]+$/, ""), 
    });

    return result.secure_url; 
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}