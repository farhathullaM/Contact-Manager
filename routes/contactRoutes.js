import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();
router.use(validateToken);

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
