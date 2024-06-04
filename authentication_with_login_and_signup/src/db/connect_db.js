import mongoose from "mongoose";

const connect_db =()=>{
    mongoose.connect("mongodb://localhost:27017")
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.log("ERROR",error)
    })
}

export {connect_db}