import express from "express";
import { signup , login , getUserById, hitApi} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signUp",signup);
router.post("/login", login);
router.post("/getUser" , getUserById)
router.get("/api" , hitApi)

export default router;
