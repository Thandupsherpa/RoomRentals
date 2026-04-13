import roomModel from "../models/room.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import userModel from "../models/user.model.js";

export const addRoom = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const {
      title,
      description,
      price,
      location,
      facilities,
      isAvailable,
      allowedGender
    } = req.body;

    const files = req.files;

    let imageUrls = [];

    
    if (files && files.length > 0) {
      for (let file of files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const room = await roomModel.create({
      owner: ownerId,
      title,
      description,
      price,
      location,
      images: imageUrls, // ✅ now correct
      facilities: facilities ? JSON.parse(facilities) : [],
      isAvailable,
      allowedGender: allowedGender
        ? JSON.parse(allowedGender)
        : ["MALE", "FEMALE", "OTHERS"]
    });

    res.status(201).json({
      message: "Room created successfully",
      room
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOwnerProfile = async (req,res) =>{
    try {
        const ownerId = req.user.id;

        const owner = await userModel.findById(ownerId).select("-password")

        const rooms = await roomModel.find({owner:ownerId});

        res.json({
            owner:{
                fullName:`${owner.firstName} ${owner.middleName || ""} ${owner.lastName}`,
                email:owner.email,
                profilePic:owner.profilePic
            },
            rooms
        });
        
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}