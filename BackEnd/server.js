import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/tasks.route.js"

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");

}).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.use("/user",userRoutes)
app.use("/tasks",taskRoutes)


app.listen(3000, () => {
    console.log("server is running on port 3000");
});