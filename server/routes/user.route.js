import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  user,
  logout,
} from "../controllers/user.controller.js";

import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/profile", authenticateUser, getProfile);
router.get("/me", user);

export default router;
