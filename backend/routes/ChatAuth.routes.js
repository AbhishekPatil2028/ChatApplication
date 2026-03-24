import express from "express";
import { signup, login } from "../controllers/chatAuth.controller.js";

const router = express.Router();

router.post("/chat-signup", signup);
router.post("/chat-login", login);


export default router;
