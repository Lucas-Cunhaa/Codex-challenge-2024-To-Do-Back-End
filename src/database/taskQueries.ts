import { mongoDB } from "./connection";
import { UserInterface } from "../interface/types";
import { ChangeInterface } from "../interface/types";
import { ObjectId } from "mongodb";
const collection = mongoDB.getCollection();

async function initialize() {
    await mongoDB.connect(); 
};

initialize();
