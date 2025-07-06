import express from "express";
import { authenticateUser } from "../controllers/authcontroller";

const router = express.Router();

router.post("/auth", authenticateUser);

export default router;
