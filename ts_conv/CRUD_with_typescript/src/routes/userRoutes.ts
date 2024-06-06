import express from "express";
import { addUser, deleteUser, findUser, getUsers, updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/",addUser);

router.get("/",getUsers);

router.get("/:id",findUser);

router.patch("/:id",updateUser);

router.delete("/:id",deleteUser);

export {router as userRoutes};      