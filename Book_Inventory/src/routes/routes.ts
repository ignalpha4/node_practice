import express from "express";
import { login, signUp } from "../controllers/userController";
import { authAdmin, authUser } from "../middleware/authenticateUsers";
import { addBook, deleteBook, listBooks, updateBook } from "../controllers/booksController";
import { addAuthor, deleteAuthor, listAuthors, updateAuthor } from "../controllers/authorController";
import { addCategory, deleteCategory, listCategory, updateCategory } from "../controllers/categoryController";


const router = express.Router();


//login and signup

router.post("/signup",signUp);

router.post("/login",login);

//CRUD Books
router.post("/addbook",authUser,addBook);
router.get("/listbooks",authUser,listBooks);
router.patch("/updatebook",authUser,updateBook);
router.delete("/deletebook",authUser,deleteBook);

//CRUD authors
router.post("/addauthor",authUser,authAdmin,addAuthor);
router.get("/listauthors",authUser,authAdmin,listAuthors);
router.patch("/updateauthor",authUser,authAdmin,updateAuthor);
router.delete("/deleteauthor",authUser,authAdmin,deleteAuthor);

//CRUD category
router.post("/addcategory",authUser,authAdmin,addCategory);
router.get("/listcategory",authUser,authAdmin,listCategory);
router.patch("/updatecategory",authUser,authAdmin,updateCategory);
router.delete("/deletecategory",authUser,authAdmin,deleteCategory);


export {router as allRoutes};