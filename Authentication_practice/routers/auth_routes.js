import express from "express";
import {middle } from "../middleware/auth_middlewear.js";
import {auth_controller} from "../controllers/auth_controller.js";


const router=express.Router();


router.post("/auth",middle,auth_controller);


export {router as indexRoute};