import mongoose from "mongoose"


export const db_connect=()=>{
    mongoose.connect("mongodb+srv://shubhamtempacc:m4z2paUuPbvnChKy@cluster0.dzumnro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log("db_connected") 
    }).catch((err)=>{
        console.log("cannot connect to db",err)
    })
}