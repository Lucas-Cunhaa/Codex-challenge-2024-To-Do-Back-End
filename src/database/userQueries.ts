import { mongoDB } from "./connection";
import { UserInterface } from "../interface/types";
import { ChangeInterface } from "../interface/types";
import { ObjectId } from "mongodb";
const collection = mongoDB.getCollection();

async function initialize() {
    await mongoDB.connect(); 
};

export const insertUser = async (document: UserInterface ) => {
    try {
        const request = await collection.insertOne(document);
        return request;
    } catch (err) {
        console.error("Error in creating User", err);
    }
};

export const getUserByEmail = async (email : string) => {
    try {
        const request = await collection.findOne({ email })
        return request
    } catch (err) {
        console.error('Error on getting user by email', err)
    }
};

export const updateUserById = async (id: ObjectId, changes: ChangeInterface) => {
    try {
        const updateFields: any = {};

        if (changes.name !== undefined) updateFields.name = changes.name;
        if (changes.age !== undefined) updateFields.age = changes.age;
        if (changes.photo !== undefined) updateFields.photo = changes.photo;

        const request = await collection.updateOne(
            { _id: id },
            { $set: updateFields }
        );

    } catch (error) {
          console.error('Error updating user', error);
    }
};

initialize();
