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
export const deleteRoom = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const roomId = req.params.id;

    const room = await roomModel.findOneAndDelete({
      _id: roomId,
      owner: ownerId
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const roomId = req.params.id;

    const updatedRoom = await roomModel.findOneAndUpdate(
      { _id: roomId, owner: ownerId },
      req.body,
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      message: "Room updated successfully",
      room: updatedRoom
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};