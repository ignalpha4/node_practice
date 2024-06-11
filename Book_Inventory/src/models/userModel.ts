import mongoose, { Mongoose } from "mongoose";
import { IUserModel } from "../interfaces/userModelInterface";

const userSchema = new mongoose.Schema<IUserModel>({

    name:{
        type:String,
        required:true,
        unique:true
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
    role:{
        type:String,
        enum: ['admin','author'],
        required:true
    }
});

const userModel = mongoose.model('user',userSchema);

export default userModel;