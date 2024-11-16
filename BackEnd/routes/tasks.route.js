import express from "express";
import { createTask  , getTasks , deleteTask , updateTask} from "../controllers/tasks.controller.js";
import { authenticate } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create" , authenticate , createTask);
router.get("/all" , authenticate , getTasks);
router.delete("/delete-task/:id" , authenticate , deleteTask);
router.put("/update/:id" , authenticate , updateTask)

export default router;