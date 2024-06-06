import mongoose, { mongo } from "mongoose";
import { IUserSchema } from "../interfaces/userModel.interface";

const userSchema  = new mongoose.Schema<IUserSchema>({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
},{timestamps:true});

const user = mongoose.model<IUserSchema>("user",userSchema);

export default user;


