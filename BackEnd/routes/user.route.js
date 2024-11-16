import express from "express";
import { signup , login} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signUp",signup);
router.get("/login", login);

export default router;
