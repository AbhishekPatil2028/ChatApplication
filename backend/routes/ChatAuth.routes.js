import express from "express";
import { signup, login, getAllUsers } from "../controllers/chatAuth.controller.js";

const router = express.Router();

router.post("/chat-signup", signup);
router.post("/chat-login", login);

router.get("/users", getAllUsers);

export default router;
