import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const uploadImages = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    let imageUrls = [];

    for (let file of files) {
      const result = await uploadToCloudinary(file.buffer);
      imageUrls.push(result.secure_url);
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      images: imageUrls
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};