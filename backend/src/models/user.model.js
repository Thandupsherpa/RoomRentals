import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    middleName: {
        type: String,
        required: false,  
        trim: true,
        default: null 
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be different"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
       
    },
    role:{
        type:String,
        enum:["TENANT","OWNER"],
        default:"tenant"
    },


},
{timestamps:true})

const userModel = mongoose.model("user",userSchema);

export default userModel;