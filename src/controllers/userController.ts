import { Request, Response } from "express";
import { insertUser, getUserByEmail, updateUserById } from "../database/userQueries";
import { hash } from "bcryptjs";
import { UserDTO } from "../dtos/userDto";
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, gender, age, email, password} = req.body;

        const hashedPassword = await hash(password, 6);

        const emailExists = await getUserByEmail(email);
        if (emailExists) return res.status(409).json({ message: "Email alredy exists", sucess: false });

        const user = new UserDTO(name, gender, age, email, hashedPassword);

        const data = await insertUser(user);

        res.status(200).json({ message: "User has been registered", sucess: true });

    } catch (err) {
        console.error("Error during creating the user operation", err);
        res.status(404).json({ message: "Error on creating user", sucess: false });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Invalid values provided for login", success: false });

        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials", success: false });
        
        const passwordMatch = await bcrypt.compare(password, user.password); 

        if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials", success: false });
        
        return res.status(200).json({ message: "Login successful", data: user, success: true });

    } catch (err) {
        console.error("Error during login:", err);
        return res.status(400).json({ message: "Login operation error", success: false });
    }
};

export const updateProfile = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;

        const { name, age, photo } = req.body;

        const changeInfos = {name: name, age: age, photo: photo};

        const data = await updateUserById(id, changeInfos );

        if(!data) return res.status(400).json({ message: "Error on editing profile", success: false });
        
        res.status(200).json({ message: "Profile edited successfully", success: true });

    } catch (err) {
        console.error("Error during updating profile:", err);
        return  res.status(404).json({ message: "Error on editing profile", success: false })
    }
};