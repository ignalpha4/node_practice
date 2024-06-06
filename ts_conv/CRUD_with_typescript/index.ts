import express from "express";
import { userRoutes } from "./src/routes/userRoutes";
import { connect_db } from "./src/db/connect_db";
import config from 'config';

const app = express();

const PORT =config.get("PortNumber");


app.use(express.json());

//DB connection

connect_db();

//routes
app.use("/user",userRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
