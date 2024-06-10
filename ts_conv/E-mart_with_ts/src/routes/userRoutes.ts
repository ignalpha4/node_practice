import express from "express";
import { userControllerClass } from "../controllers/userController";
import { userAuthentication } from "../middleware/authUser";
import { profileControllerClass } from "../controllers/profileController";
import { profileAuthentication } from "../middleware/authProfile";
import { cartControllerClass } from "../controllers/cartController";

const authUserObj = new userAuthentication();

const authProfileObj = new profileAuthentication();

const userControllerObj = new userControllerClass();

const profileControllerObj  =  new profileControllerClass();

const cartControllerObj = new cartControllerClass();


const router =  express.Router();

//user account operations
router.post("/signup",userControllerObj.userSignUp);
router.post("/login",userControllerObj.userLogin);
router.patch("/update",authUserObj.authUser,userControllerObj.updateUser);

//profile creation and other operations

router.post("/addprofile",authUserObj.authUser,profileControllerObj.addProfile);

router.get("/listprofiles",authUserObj.authUser,profileControllerObj.listProfiles);

router.delete("/deleteProfile",authUserObj.authUser,profileControllerObj.deleteProfile);

router.post("/selectprofile",authUserObj.authUser,profileControllerObj.selectProfile);

//cart operations

router.post("/additem",authProfileObj.authProfile,cartControllerObj.addItem);

export {router as userRoutes}  