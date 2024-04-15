import express from "express";
import cors from "cors";
import {indexRoute} from './routers/auth_routes.js';
const app=express();


app.use(express.json());
app.use(cors());


const port=3000;


app.use("/api",indexRoute);



app.listen(port,()=>{
    console.log( `Listening on Port ${port}`);
})

