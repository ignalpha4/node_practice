
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required :[true,"Username is required"]
    },

    email:{
        type:String,
        required:[true,"Email is required"]
    },

    password:{
        type:String,
        required:[true,"Password is required"]
    },


},{timestamps:true})

const userDetails = mongoose.model("user_info",UserSchema);

export {userDetails} 