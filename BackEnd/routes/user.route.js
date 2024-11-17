import express from "express";
import { signup , login , getUserById} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signUp",signup);
router.post("/login", login);
router.post("/getUser" , getUserById)

export default router;
