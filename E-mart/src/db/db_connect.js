
import mongoose from "mongoose";

const connect_db=()=>{
    mongoose.connect("mongodb://localhost:27017/e-mart")
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch((error)=>{
        console.log(error);
    })
}
export {connect_db};
