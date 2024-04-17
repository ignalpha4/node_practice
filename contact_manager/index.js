import express from "express";
import { configDotenv } from "dotenv";
import {contact_route} from "./Routes/contact_routes.js"

const app=express();
const port=process.env.PORT || 5000;


//middlewear
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Home page");
})

app.use("/api/contacts",contact_route);

app.listen(port,()=>{
    console.log(`Server Running on : http://localhost:${port}`);
})
