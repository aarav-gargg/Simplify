import express from "express";
import { createTask  , getTasks , deleteTask , updateTask , updateImpTask , updateComTask , getComTasks , getImpTasks} from "../controllers/tasks.controller.js";
import { authenticate } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create" , authenticate , createTask);
router.get("/all" , authenticate , getTasks);
router.delete("/delete-task/:id" , authenticate , deleteTask);
router.put("/update/:id" , authenticate , updateTask)
router.put("/updateImp/:id" , authenticate , updateImpTask)
router.put("/updateCom/:id" , authenticate , updateComTask)
router.get("/complete" , authenticate , getComTasks);
router.get("/important" , authenticate , getImpTasks);

export default router;