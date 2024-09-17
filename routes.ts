import express from "express";
import { registerUser, loginUser, updateProfile } from "./src/controllers/userController";
import { addTask } from "./src/controllers/taskController";
const route = express.Router();

route.post("/app/singup", registerUser);
route.post("/app/login", loginUser);
route.put("/app/editProfile/:id", updateProfile);

route.post("/app/addTask/:id", addTask)
export default route;