import express from "express";
import { registerUser, loginUser } from "./src/controllers/userController";
const route = express.Router()

route.post("/app/singup", registerUser)
route.post("/app/login", loginUser)


export default route