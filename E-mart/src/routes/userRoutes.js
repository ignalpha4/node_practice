import express from "express";
import { deleteUser, getInfo, updateUser, userLogin, userSignup } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { addProfile, deleteProfile, editProfile } from "../controllers/profileController.js";
import { auth_profile } from "../middleware/auth_profile.js";
import { addItem } from "../controllers/cartController.js";

const router = express.Router();

router.post("/signup",userSignup);
router.post("/login",userLogin);


router.get("/getinfo",authenticate,getInfo);
router.patch("/updateinfo",authenticate,updateUser);
router.delete("/delete",authenticate,deleteUser);

router.post("/addprofile",authenticate,addProfile);
router.post("/editprofile",authenticate,editProfile);
router.delete("/deleteprofile",authenticate,deleteProfile);


router.post("/additem",auth_profile,addItem);

export {router as userRoutes};