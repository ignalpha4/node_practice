import express from "express";
import { auth_middlewear } from "../middleware/auth_middlewear.js";
import { auth_controller_fun } from "../controllers/auth_controller.js";


const router=express.Router();

router.post("/auth",auth_middlewear,auth_controller_fun);

export default router;