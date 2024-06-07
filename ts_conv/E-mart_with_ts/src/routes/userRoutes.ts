import express from "express";
import { updateUser, userLogin, userSignUp } from "../controllers/userController";
import { authUser } from "../middleware/authUser";
import { deleteProfile,addProfile, listProfiles, selectProfile } from "../controllers/profileController";
import { authProfile } from "../middleware/authProfile";
import { addItem } from "../controllers/cartController";

const router =  express.Router();

//user account operations
router.post("/signup",userSignUp);
router.post("/login",userLogin);
router.patch("/update",authUser,updateUser);

//profile creation and other operations

router.post("/addprofile",authUser,addProfile);

router.get("/listprofiles",authUser,listProfiles);

router.delete("/deleteProfile",authUser,deleteProfile);

router.post("/selectprofile",authUser,selectProfile);

//cart operations

router.post("/additem",authProfile,addItem);

export {router as userRoutes}  