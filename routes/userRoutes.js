import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", currentUser);

export default router;
