
import express from "express";
import { getInfo, updateInfo,deleteUser,loginHandler,signupHandler } from "../controllers/users_controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/signup",signupHandler);

router.post("/login",loginHandler);

router.get("/",authenticate,getInfo);

router.patch("/",authenticate,updateInfo);

router.delete("/",authenticate,deleteUser);


export default router;



