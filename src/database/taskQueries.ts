import { mongoDB } from "./connection";
import { getObjectId } from "./getObjectId";

const collection = mongoDB.getCollection();

async function initialize() {
    await mongoDB.connect(); 
};

export const insertTaskByUserId = async (id : string, task: any) => {
    try {
        const objectId = getObjectId(id);

        const request = await collection.findOneAndUpdate(
            {_id: objectId}, 
            {$push: {tasks: task } }, 
        );

        return request;

    } catch (err) {
        console.error("Error on inseting task", err);
    }
};

export const getAllTasks = async (userId: string) => {
  try {
    const userObjectId = getObjectId(userId);
    const request = await collection.find({_id: userObjectId}, {projection: {tasks: 1} }).toArray();

    return request;

  } catch (err) {
    console.error("Error while getting all the tasks", err)
  }
 
}
export const updateTaskById = async (userId: string, taskId : string, name: any, Date: any, isCompleted: any, description: any) => {
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
                          {
                            $arrayElemAt: ['$tasks', { $indexOfArray: ['$tasks.id', taskObjectId] }]
                          },
                          {
                            isCompleted: {
                              $cond: {
                                if: { $ne: [isCompleted, null] },
                                then: isCompleted,
                                else: {
                                  $arrayElemAt: ['$tasks.isCompleted', { $indexOfArray: ['$tasks.id', taskObjectId] }]
                                }
                              }
                            },
                            Date: {
                              $cond: {
                                if: { $ne: [Date, null] },
                                then: Date,
                                else: {
                                  $arrayElemAt: ['$tasks.Date', { $indexOfArray: ['$tasks.id', taskObjectId] }]
                                }
                              }
                            },
                            name: {
                              $cond: {
                                if: { $ne: [name, null] },
                                then: name,
                                else: {
                                  $arrayElemAt: ['$tasks.name', { $indexOfArray: ['$tasks.id', taskObjectId] }]
                                }
                              }
                            },
                            description: {
                              $cond: {
                                if: { $ne: [description, null] },
                                then: description,
                                else: {
                                  $arrayElemAt: ['$tasks.description', { $indexOfArray: ['$tasks.id', taskObjectId] }]
                                }
                              }
                            }
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
