export class TaskDTO {
    public name: string;
    public date: Date;
    public isCompleted: boolean;
    public description: string;

    constructor(
        name: string,
        date: Date,
        isCompleted: boolean,
        description: string
    ) {
        this.name = name;
        this.date = date;
        this.isCompleted = isCompleted;
        this.description = description;
    }

 
};
