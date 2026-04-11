import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (fileBuffer)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream(
            {
                folder:"room-images"
            },
            (error,result)=>{
                if(error) return result(error);
                resolve(result)
            }
        ).end(fileBuffer)
    });
};
