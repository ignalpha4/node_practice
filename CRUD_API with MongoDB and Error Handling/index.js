import express from "express"
import router from "./routes/user_routes.js";
import bodyParser from "body-parser"
import { db_connect } from "./db/db_connection.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app= express();
const PORT = 5000;

db_connect()

//to specify that the data that is sent is json
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    console.log("Welcome to homepage")
    res.send("<h1>Hello from Home</h1>")
})

app.use("/users",router);


//errorhandler middleware
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}. `)
})