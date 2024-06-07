

import mongoose, { mongo } from "mongoose";

export const connect_db=()=>{
    mongoose.connect("mongodb://localhost:27017/e-mart_with_ts")
    .then(()=>{
        console.log("Connected to Database !")
    })
    .catch((error)=>{
        console.log("Error in DB connection :",error);
    })
}


