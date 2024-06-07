import express from "express";
import { connect_db } from "./src/db/connect_database";
import { userRoutes } from "./src/routes/userRoutes";

const app = express();
const PORT = 5000;

app.use(express.json());

//connection to db 

connect_db();

//routes
app.use("/user",userRoutes);


app.listen(PORT,()=>{
    console.log(`Runnning on ${PORT} ....`);
})
