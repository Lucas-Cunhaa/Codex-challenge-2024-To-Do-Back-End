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
    password: string;
    tasks: TaskInterface[] | []
    photo: string
}

export interface ChangeInterface {
    name?: string;
    age?: number;
    photo?: string; 
}

