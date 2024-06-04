import mongoose from "mongoose";

const connect_db =()=>{
    mongoose.connect("mongodb+srv://shubhamtempacc:m4z2paUuPbvnChKy@cluster0.dzumnro.mongodb.net/user_authentication?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.log("ERROR",error)
    })
}

export {connect_db}