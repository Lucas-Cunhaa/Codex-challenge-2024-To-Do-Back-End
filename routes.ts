import express from "express";
import { registerUser, loginUser, updateProfile } from "./src/controllers/userController";
import { addTask, deleteTask } from "./src/controllers/taskController";
const route = express.Router();

route.post("/app/singup", registerUser);
route.post("/app/login", loginUser);
route.put("/app/editProfile/:id", updateProfile);

route.post("/app/addTask/:id", addTask);
route.delete("/app/deleteTask/:userId/:taskId", deleteTask);

export default route;