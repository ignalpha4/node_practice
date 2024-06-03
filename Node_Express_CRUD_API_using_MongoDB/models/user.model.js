import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
})

 const user = mongoose.model("user",userSchema);
 export default user;