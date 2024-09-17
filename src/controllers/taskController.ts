import { Request, Response } from "express";
import { insertTaskByUserId, deleteTaskById, updateTaskById } from "../database/taskQueries";
import { TaskDTO } from "../dtos/taskDto";


export const addTask = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;

        const { name, Date, isCompleted, description } = req.body;
        const task = new TaskDTO(name, Date, isCompleted, description);
        console.log(task)
        const data = await insertTaskByUserId(id, task); 
        
        if(!data) return res.status(400).json({ message: "Error while adding the task", sucess: false});

        res.status(200).json({ message: "Task added sucefully", data: task, sucess: true});
    } catch (err) {
        console.error("Error while adding the task", err)
        res.status(404).json({ message: "Error while adding the task", sucess: false});
    }
}

export const updateTask = async (req: Request, res: Response) => { 
    try {
        const { userId, taskId } = req.params;

        const updatedFields: Partial<TaskDTO> = req.body;

        const data = await updateTaskById(userId, taskId, updatedFields);
    
        if(!data) return res.status(400).json({ message: "Error while updating the task", sucess: false});
    
        res.status(200).json({ message: "Task updated sucefully", sucess: true});

    } catch (err) {
        console.error("Error while editing task", err); 
        res.status(404).json({ message: "Error while editing task", sucess: false})
    }
   
}

export const deleteTask = async (req: Request, res: Response) => { 
    try {
        const { userId, taskId } = req.params

        const data = await deleteTaskById(userId, taskId);
    
        if(!data) return res.status(400).json({ message: "Error while deleting the task", sucess: false})
    
        res.status(200).json({ message: "Task deleted sucefully", sucess: true});
    } catch (err) {
        console.error("Error while deleting task", err); 
        res.status(404).json({ message: "Error while deleting task", sucess: false})
    }
   
}