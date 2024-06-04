import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import {connect_db} from "./src/db/connect_db.js"


const app = express();
const PORT = 5000;

connect_db();

app.use(bodyParser.json());

app.use("/user",userRoutes);

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT} ...`)
})