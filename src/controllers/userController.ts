import { Request, Response } from "express"
import {insertUser, getUserByEmail ,getUserByEmailAndPassword} from "../database/userQueries"
import { UserDTO } from "../dtos/userDto"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, password,} = req.body

        const emailExists = await getUserByEmail(email)
        if (emailExists) return res.status(409).json({ message: "Email alredy exists", sucess: false })

        const user = new UserDTO(name, gender, age, email, password)

        const data = await insertUser(user)

        res.status(200).json({ message: "User has been registered", sucess: true })
    } catch (err) {
        res.status(404).json({ message: "Error on creating user", sucess: false })
    }
}

export const loginUser = async (req: Request, res: Response) => { 
    try {
        const { email, password } = req.body; 
        if ( !email || !password) throw new Error("Invalid values provided for login");

        const data = await getUserByEmailAndPassword(email, password);

        if (data) return res.status(200).json({message: "Login successful", data :data?.insertedId, sucess: true})
        
        res.status(401).json({message: "Invalid credentials", sucess: false})
    } catch (error) {
        res.status(404).json({message: "Login operation error", sucess: false})
    }
}