import express from "express";
import {userRoutes} from "./src/routes/userRoutes.js";
import {connect_db} from "./src/db/db_connect.js"

const app = express();
const PORT = 5000;

app.use(express.json());

connect_db();

app.use("/user",userRoutes);

app.listen(5000,()=>{
    console.log(`Server Running on ${PORT} ..`)
})