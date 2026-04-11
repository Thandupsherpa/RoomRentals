import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

  
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true
    },

    
    checkInDate: {
      type: Date,
      required: true
    },

    checkOutDate: {
      type: Date,
      required: true
    },

   
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "cancelled"],
      default: "pending"
    },

    
    message: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;