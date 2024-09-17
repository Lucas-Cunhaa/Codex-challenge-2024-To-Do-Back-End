import express from "express";
import { registerUser, loginUser, updateProfile } from "./src/controllers/userController";
const route = express.Router();

route.post("/app/singup", registerUser);
route.post("/app/login", loginUser);
route.put("/app/editProfile/:id", updateProfile);

export default route;