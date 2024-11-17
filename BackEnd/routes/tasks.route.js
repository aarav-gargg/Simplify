import express from "express";
import { createTask  , getTasks , deleteTask , updateTask , updateImpTask , updateComTask , getComTasks , getImpTasks , getIncTasks} from "../controllers/tasks.controller.js";
import { authenticate } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create" , authenticate , createTask);
router.post("/all" , authenticate , getTasks);
router.post("/delete-task/:id" , authenticate , deleteTask);
router.post("/update/:id" , authenticate , updateTask)
router.post("/updateImp/:id" , authenticate , updateImpTask)
router.post("/updateCom/:id" , authenticate , updateComTask)
router.post("/complete" , authenticate , getComTasks);
router.post("/important" , authenticate , getImpTasks);
router.post("/incomplete" , authenticate , getIncTasks);

export default router;