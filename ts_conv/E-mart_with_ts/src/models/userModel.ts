

import mongoose, { mongo } from "mongoose";
import { IUserModel } from "../interfaces/userModelInterface";


const userSchema  = new mongoose.Schema<IUserModel>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});


const userModel = mongoose.model<IUserModel>("user",userSchema);

export default userModel;