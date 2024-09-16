import { TaskInterface } from "../interface/types";

export class UserDTO {
    public name: string;
    public gender: string;
    public age: number;
    public email: string;
    public passwordHash: string;
    public tasks: TaskInterface[] | [];

    constructor(
        name: string,
        gender: string,
        age: number,
        email: string,
        passwordHash: string,
    ) {
        if (!name || !gender || !email || !passwordHash) {
            throw new Error("Invalid values provided for UserDTO");
        }

        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.passwordHash = passwordHash;
        this.tasks = [];
    }
}
