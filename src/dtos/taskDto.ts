export class TaskDTO {
    public id: number; 
    public name: string;
    public date: Date;
    public isCompleted: boolean;
    public description: string;

    constructor(
        id: number, 
        name: string,
        date: Date,
        isCompleted: boolean,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.isCompleted = isCompleted;
        this.description = description;
    }

 
}
