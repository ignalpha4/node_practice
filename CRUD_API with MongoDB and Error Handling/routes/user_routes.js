
import express from "express";
import { getUsers ,createUser, findUser, deleteUser, updateUser} from "../controllers/user_controller.js";



const router = express.Router();


router.get("/",getUsers);

router.post("/",createUser);

router.get("/:user_id",findUser);

router.delete("/:user_id",deleteUser)

router.patch("/:user_id",updateUser)


export default router;

