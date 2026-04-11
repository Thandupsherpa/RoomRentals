import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
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
        enum:["tenant","owner"],
        default:"tenant"
    },
    

},
{timestamps:true})

const userModel = mongoose.model("user",userSchema);

export default userModel;