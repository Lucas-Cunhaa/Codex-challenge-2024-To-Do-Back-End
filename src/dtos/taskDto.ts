import { ObjectId } from "mongodb";

export class TaskDTO {
    public id: ObjectId; 
    public name: string;
    public Date: Date;
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
        this.Date = new Date (stringDate);
        this.isCompleted = this.setIsCompleted(stringIsCompleted);
        this.description = description;
        this.id = this.setId();
    }
    
    setIsCompleted = (stringIsCompleted: string) => {
        return stringIsCompleted === "true";
    };

    setId() {
        const objectId = new ObjectId();
        return objectId;
    };
 
};
