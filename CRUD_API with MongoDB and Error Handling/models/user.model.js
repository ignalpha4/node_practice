

import mongoose from "mongoose";

 const userSchema= mongoose.Schema({

    username:{
        type:String,
        required : true
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

const user =mongoose.model("users",userSchema);

export default user;