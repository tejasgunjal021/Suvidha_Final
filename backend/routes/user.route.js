
import express from "express";
import { getUserById } from "../controllers/user.controller.js";
const router = express.Router();

// Route to fetch user by their ID (used in vendor profile)
router.get('/:id', getUserById);

export default router;
