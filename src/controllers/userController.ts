import { Request, Response } from "express"
import {insertUser, getUserByEmail ,getUserByEmailAndPassword} from "../database/userQueries"
import { UserDTO } from "../dtos/userDto"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, passwordHash,} = req.body

        const emailExists = await getUserByEmail(email)
        if (emailExists) return res.status(409).json({ message: "Email alredy exists", sucess: false })

        const user = new UserDTO(name, gender, age, email, passwordHash)

        const data = await insertUser(user)

        res.status(200).json({ message: "User has been registered", sucess: true })
    } catch (error) {
        res.status(404).json({ message: "Error on creating user", sucess: false })
    }
}