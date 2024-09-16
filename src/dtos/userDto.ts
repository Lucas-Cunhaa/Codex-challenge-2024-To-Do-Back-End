import { TaskDTO } from "./taskDto";
export class UserDTO {
    public name: string;
    public gender: string;
    public age: number;
    public email: string;
    public passwordHash: string;
    public tasks: TaskDTO[] | [];

    constructor(
        name: string,
        gender: string,
        age: number,
        email: string,
        passwordHash: string,
        tasks: TaskDTO[] | []
    ) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.passwordHash = passwordHash;
        this.tasks = tasks;
    }
}