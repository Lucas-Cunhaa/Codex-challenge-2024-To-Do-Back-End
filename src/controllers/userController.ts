import { Request, Response } from "express"
import {insertUser, getUserByEmail ,getUserByEmailAndPassword} from "../database/userQueries"
import { UserDTO } from "../dtos/userDto"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, passwordHash,} = req.body

        const emailExists = await getUserByEmail(email)
        if (emailExists) return res.status(409).send("Email alredy exists")

        const user = new UserDTO(name, gender, age, email, passwordHash)

        const data = await insertUser(user)

        res.status(200).send("User has been registered")
    } catch (error) {
        res.status(404).send("Error on creating user")
    }
}