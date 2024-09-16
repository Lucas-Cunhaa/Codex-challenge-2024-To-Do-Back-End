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
        tasks: TaskDTO[]
    ) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.passwordHash = passwordHash;
        this.tasks = tasks;
    }

    // Método exemplo de validação
    public validateEmail(): boolean {
        // Lógica para validar o e-mail
        return /\S+@\S+\.\S+/.test(this.email);
    }
}