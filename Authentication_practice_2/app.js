import express from "express";
import router from "./routes/auth_routes.js";

const PORT=3000
const app= express()

app.use(express.json());

app.use("/api",router);

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`);
})

