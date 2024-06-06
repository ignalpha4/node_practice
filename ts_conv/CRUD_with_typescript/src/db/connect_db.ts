import mongoose from "mongoose";
import config from 'config'

export const connect_db = ()=>{
    // mongoose.connect("mongodb://localhost:27017/crud_ts")
    mongoose.connect(config.get("dbUrl"))
    .then(()=>{
        console.log("Connect to Database \n")
    })
    .catch((error)=>{
        console.log(error);
    })
}


