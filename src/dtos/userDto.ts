import { TaskInterface } from "../interface/types";

export class UserDTO {
    public name: string;
    public gender: string;
    public age: number;
    public email: string;
    public password: string;
    public tasks: TaskInterface[] | [];

    constructor(
        name: string,
        gender: string,
        age: number,
        email: string,
        password: string,
    ) {
        if (!name || !gender || !email || !password) {
            throw new Error("Invalid values provided for UserDTO");
        }

        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.password = password;
        this.tasks = [];
    }
}
