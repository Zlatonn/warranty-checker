import express from "express";

import { logInUser } from "../controllers/authController";

// Create router
const router = express.Router();

// Path get all items => GET /auth/login
router.post("/login", logInUser);

export default router;
