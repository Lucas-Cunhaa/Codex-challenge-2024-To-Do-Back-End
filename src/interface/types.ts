export interface TaskInterface {
    id: number;
    name: string,
    date: Date,
    isCompleted: boolean,
    description: string,
}
export interface UserInterface {
    name: string; 
    gender: string; 
    age: number; 
    email: string; 
    passwordHash: string;
    tasks: TaskInterface[] | []
}

