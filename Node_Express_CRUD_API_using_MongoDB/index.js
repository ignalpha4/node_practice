import express from "express";
import bodyParser from 'body-parser';
import  userRoutes from './Routes/users.js'
import { db_connect } from "./db/db_config.js";

const app=express();
const PORT=5000;


db_connect();

//to specify that the data that is sent is json
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("Hello from Homepage");
})

app.use('/users',userRoutes);


app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
}) 

