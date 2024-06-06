import express from "express";
import { deleteUser, getInfo, updateUser, userLogin, userSignup } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { addProfile, deleteProfile, editProfile, listProfiles, selectprofile } from "../controllers/profileController.js";
import { auth_profile } from "../middleware/auth_profile.js";
import { addItem } from "../controllers/cartController.js";

const router = express.Router();


//login and signup routes
router.post("/signup",userSignup);
router.post("/login",userLogin);

//crud operations on user
router.get("/getinfo",authenticate,getInfo);
router.patch("/updateinfo",authenticate,updateUser);
router.delete("/delete",authenticate,deleteUser);

//operations on profiles of user
router.post("/addprofile",authenticate,addProfile);
router.post("/editprofile",authenticate,editProfile);
router.delete("/deleteprofile",authenticate,deleteProfile);

//viewing and selecting profile
router.get("/listprofiles",authenticate,listProfiles);
router.post("/selectprofile",authenticate,selectprofile);

//adding items to the cart
router.post("/additem",auth_profile,addItem);

export {router as userRoutes};