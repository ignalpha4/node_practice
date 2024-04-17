import express from "express";

import { get_contacts,add_contact, get_contact_with_id,update_contact, delete_contact } from "../controllers/contacts_controller.js";

const router = express.Router();

router.get("/",get_contacts);

router.post("/",add_contact)

router.get("/:id",get_contact_with_id);

router.put("/:id",update_contact)

router.delete("/:id",delete_contact)


export {router as contact_route}