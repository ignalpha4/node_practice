import mongoose from "mongoose";

const connect_db =()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/test")
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.log("ERROR",error)
    })
}
export {connect_db}