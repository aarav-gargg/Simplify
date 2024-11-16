import Task from "../models/tasks.model.js";
import User from "../models/users.model.js";
import { authenticate } from "./user.controller.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const user = req.user;
        
        const task = new Task({ title, description });
        const savedTask = await task.save();

        user.tasks.push(savedTask._id);
        await user.save();

        res.status(201).json({
            message: "Task created successfully",
            task: savedTask,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;

        const userWithTasks = await User.findById(userId).populate({
            path: 'tasks', 
            options: { sort: { createdAt: -1 } } 
        });

        if (!userWithTasks) {
            return res.status(404).json({ message: "User not found" });
        }

        const tasks = userWithTasks.tasks;

        res.status(200).json(tasks);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;  
        const user = req.user;  

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

      
        await User.findByIdAndUpdate(user.id, {
            $pull: { tasks: id } 
        });

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req,res) =>{
    try {
        const {id} = req.params;
        const {title , description} = req.body;

        await Task.findByIdAndUpdate(id , {title : title , description : description});

        return res.status(200).json({
            message : "TASK UPDATED SUCCESSFULLY"
        })


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}





