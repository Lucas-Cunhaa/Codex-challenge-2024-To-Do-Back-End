import { mongoDB } from "./connection";
import { UserInterface } from "../interface/types";
import { TaskDTO } from "../dtos/taskDto";
import { ChangeInterface } from "../interface/types";
import { ObjectId } from "mongodb";
import { getObjectId } from "./getObjectId";

const collection = mongoDB.getCollection();

async function initialize() {
    await mongoDB.connect(); 
};

export const insertTaskByUserId = (id : string, task: any) => {
    
    try {
        const objectId = getObjectId(id);

        const request = collection.findOneAndUpdate(
            {_id: objectId}, 
            {$push: {tasks: task } }
        );

        return request;

    } catch (err) {
        console.error("Error on inseting task", err);
    }
}
    
initialize();
