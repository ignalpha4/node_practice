import express from "express";
import { createUser,findUser,deleteUser,updateUserInfo,getAllUsers} from "../controllers/usersController.js";


const router =express.Router();




// "all starts with /users"
router.get('/',getAllUsers);

router.post("/",createUser);

router.get("/:id",findUser);

router.delete("/:id",deleteUser);

router.patch("/:id",updateUserInfo);


export default router;