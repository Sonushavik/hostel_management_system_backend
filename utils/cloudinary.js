const path = require("path");
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  
        try {
                if(!localFilePath) return null
                const ext = path.extname(localFilePath).toLowerCase();

                 const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
                const isPDF = ext === ".pdf";

                const response = await cloudinary.uploader.upload(localFilePath,{
                        resource_type: isPDF ? "raw" : "image",
                        folder: "student_documents",
                        ...(isImage && {
                                transformation: [
                                 { width: 1200, height: 1200, crop: "limit" }, 
                                 { quality: "auto" },  
                                { fetch_format: "auto" }
                                ]
                        })
                        
                })
                fs.unlinkSync(localFilePath)
                return response;
        } catch (error) {
                fs.unlinkSync(localFilePath) 
                return null;
        }
}

module.exports =  uploadOnCloudinary;