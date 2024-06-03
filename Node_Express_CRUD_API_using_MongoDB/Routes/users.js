import express from "express";
import {getAllUsers,createUser,findUser,deleteUser,updateUserInfo} from "../controllers/usersController.js";


const router =express.Router();


// "all starts with /users"
router.get('/',getAllUsers);

router.post("/",createUser);

router.get("/:userid",findUser);

router.delete("/:userid",deleteUser);

router.patch("/:userid",updateUserInfo);

export default router;