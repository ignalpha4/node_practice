import express from "express";
import bodyParser from 'body-parser';
import userRoutes from './Routes/users.js'

const app=express();
const PORT=5000;

app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("Hello from Homepage");
})

app.use('/users',userRoutes);


app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
}) 
