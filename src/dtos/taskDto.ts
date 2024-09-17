import { ObjectId } from "mongodb";

export class TaskDTO {
    public id: ObjectId; 
    public name: string;
    public date: Date;
    public isCompleted: boolean;
    public description: string;

    constructor(
        name: string,
        stringDate: string,
        stringIsCompleted: string,
        description: string,
    )
    {
        if (!name || !stringDate || !stringIsCompleted || !description) throw new Error("Invalid values provided for TaskDTO");

        this.name = name;
        this.date = this.setDate(stringDate);
        this.isCompleted = this.setIsCompleted(stringIsCompleted);
        this.description = description;
        this.id = this.setId();
    }
    setDate = (stringDate: string) => {
        const date = new Date(stringDate);
        return date;
    };

    setIsCompleted = (stringIsCompleted: string) => {
        return stringIsCompleted === "true";
    };

    setId() {
        const objectId = new ObjectId();
        return objectId;
    };
 
};
