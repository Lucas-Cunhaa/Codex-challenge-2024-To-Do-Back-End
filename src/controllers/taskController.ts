import { Request, Response } from "express";
import { insertTaskByUserId } from "../database/taskQueries";
import { TaskDTO } from "../dtos/taskDto";


export const addTask = (req: Request, res: Response) => { 
    try {
        const id = req.params.id;

        const { name, Date, isCompleted, description } = req.body;
        const task = new TaskDTO(name, Date, isCompleted, description);
        console.log(task)
        const data = insertTaskByUserId(id, task); 
        
        if(!data) return res.status(400).json({ message: "Error while adding the task", sucess: false});

        res.status(200).json({ message: "Task added sucefully", sucess: true});
    } catch (err) {
        console.error("Error while adding the task", err)
        res.status(404).json({ message: "Error while adding the task", sucess: false});
    }
}