import { mongoDB } from "./connection";
import { getObjectId } from "./getObjectId";

const collection = mongoDB.getCollection();

async function initialize() {
    await mongoDB.connect(); 
};

export const insertTaskByUserId = async (id : string, task: any) => {
    try {
        const objectId = getObjectId(id);

        const request = collection.findOneAndUpdate(
            {_id: objectId}, 
            {$push: {tasks: task } }, 
        );

        return request;

    } catch (err) {
        console.error("Error on inseting task", err);
    }
}

export const deleteTaskById = async (id : string, status: string) => {
    const objectId = getObjectId(id);
    try {
        const request = await collection.deleteOne(
            {_id: objectId}
        )

        return request
    } catch (err) {
        console.error("Erronr on deleting task by id", err)
    }
};

initialize();
