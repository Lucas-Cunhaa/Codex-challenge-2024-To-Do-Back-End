import { mongoDB } from "./connection";
import { UserInterface } from "../interface/types";
const collection = mongoDB.getCollection()

async function initialize() {
    await mongoDB.connect(); 
};

export const insertUser = async (document: UserInterface ) => {
    try {
        const request = await collection.insertOne(document)
        return request
    } catch (err) {
        console.error("Error in creating User", err)
    }
}

export const getUserByEmail = async (email : string) => {
    try {
        const request = await collection.findOne({ email })
        return request
    } catch (err) {
        console.error('Error on getting user by email', err)
    }
}

export const getUserByEmailAndPassword = async (email : string, password: string) => {
    try {
        const request = await collection.findOne(
            { email, password }, 
        )
        return request
    } catch (err) {
        console.error('Error on getting user by email and password', err)
    }
}

initialize();
