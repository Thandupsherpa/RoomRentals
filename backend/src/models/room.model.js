import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    images: [
      {
        type: String 
      }
    ],

    facilities: [
      {
        type: String 
      }
    ],

    isAvailable: {
      type: Boolean,
      default: true
    },

   
    allowedGender: {
      type: [String],
      enum: ["MALE", "FEMALE", "OTHERS"],
      default: ["MALE", "FEMALE", "OTHERS"]
    },

  },
  { timestamps: true }
);

const roomModel = mongoose.model("room",roomSchema);
export default roomModel