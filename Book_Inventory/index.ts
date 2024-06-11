import express from "express"
import { allRoutes } from "./src/routes/routes";
import { connect_db } from "./src/db/connect_db";


const app =  express();
const PORT = 5000

app.use(express.json());

//database connection
connect_db()

//routes
app.use("/user",allRoutes);


app.listen(PORT,()=>{
    console.log(`Server Running On PORT ${PORT} !`);
})
