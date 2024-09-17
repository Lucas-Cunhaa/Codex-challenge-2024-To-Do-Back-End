import { Request, Response } from "express"
import { insertUser, getUserByEmail } from "../database/userQueries"
import { hash } from "bcryptjs"
import { UserDTO } from "../dtos/userDto"
import bcrypt from 'bcryptjs';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, password} = req.body

        const hashedPassword = await hash(password, 6)

        const emailExists = await getUserByEmail(email)
        if (emailExists) return res.status(409).json({ message: "Email alredy exists", sucess: false })

        const user = new UserDTO(name, gender, age, email, hashedPassword)

        const data = await insertUser(user)

        res.status(200).json({ message: "User has been registered", sucess: true })
    } catch (err) {
        res.status(404).json({ message: "Error on creating user", sucess: false })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Invalid values provided for login", success: false });

        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials", success: false });
        
        const passwordMatch = await bcrypt.compare(password, user.password); 

        if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials", success: false });
        
        return res.status(200).json({ message: "Login successful", data: user, success: true });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Login operation error", success: false });
    }
};