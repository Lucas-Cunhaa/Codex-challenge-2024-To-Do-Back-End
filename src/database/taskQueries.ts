import { TaskDTO } from "../dtos/taskDto";
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
;

export const updateStatusTaskById = async (userId: string, taskId : string, isCompleted: boolean) => {
    try {
        const userObjectId = getObjectId(userId);
        const taskObjectId = getObjectId(taskId);
        const request = await collection.updateOne(
          { _id: userObjectId },
          [
            {
              $set: {
                tasks: {
                  $concatArrays: [
                    {
                      $filter: {
                        input: '$tasks',
                        as: 'task',
                        cond: { $ne: ['$$task.id', taskObjectId] }
                      }
                    },
                    [
                      {
                        $mergeObjects: [
                          { $arrayElemAt: ['$tasks', { $indexOfArray: ['$tasks.id', taskObjectId] }] },
                          {
                            isCompleted: isCompleted
                          }
                        ]
                      }
                    ]
                  ]
                }
              }
            }
          ]
        );
        
        return request;

    } catch (err) {
        console.error("Error while updating the task", err);
    }
   
 };

export const deleteTaskById = async (userId: string, taskId : string) => {

    const userObjectId = getObjectId(userId);
    const taskObjectId = getObjectId(taskId);
    try {
        const request = await collection.updateOne(
            { _id: userObjectId },
            [
              {
                $set: {
                  tasks: {
                    $filter: {
                      input: '$tasks',
                      as: 'task',
                      cond: { $ne: ['$$task.id', taskObjectId] }
                    }
                  }
                }
              }
            ]
          );

        if (request.modifiedCount === 0) throw new Error("Task not found or user doesn't exist");

        return request
    } catch (err) {
        console.error("Erronr on deleting task by id", err)
    }
};

initialize();
