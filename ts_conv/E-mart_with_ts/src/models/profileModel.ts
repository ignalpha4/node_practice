
import mongoose from "mongoose";
import { IProfileModel } from "../interfaces/profileModelInterface";

const profileSchema = new mongoose.Schema<IProfileModel>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    profileName:{
        type:String,
        required:true
    }
    
},{timestamps:true});


const profileModel = mongoose.model<IProfileModel>("profile",profileSchema);

export default profileModel;