import { ObjectId } from "mongodb";

export const getObjectId = (id: string) => { 
    const objectId = new ObjectId(id);

    return objectId
}
