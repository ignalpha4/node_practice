import mongoose, { Mongoose } from "mongoose";

export const connect_db =()=>{
    mongoose.connect("mongodb://localhost:27017/Book_Inventory")
    .then(()=>{
        console.log("Connected To DB");
    })
    .catch((error)=>{
        console.log(error);
    })
}