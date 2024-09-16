import express from "express";
import { registerUser } from "./src/controllers/userController";
const route = express.Router()

route.post("/app/singup", registerUser)

export default route