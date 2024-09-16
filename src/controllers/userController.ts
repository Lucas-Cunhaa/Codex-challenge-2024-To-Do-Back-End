import { Request, Response } from "express"
import {insertUser, getUserByEmail ,getUserByEmailAndPassword} from "../database/userQueries"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, passwordHash,} = req.body
        const user = new User(name, gender, age, email, passwordHash)
        getUserByEmail()
    } catch (error) {
        
    }
}