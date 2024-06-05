import mongoose from "mongoose";

const profilesSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true 
    },

    profileName:{
        type:String,
        required:true 
    }

},{timestamps:true})

const profiles = mongoose.model("Profile",profilesSchema);
export {profiles}
