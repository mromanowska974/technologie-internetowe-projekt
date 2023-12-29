import { Employee } from "./employee";
import { Task } from "./task";

export class Team{
    id: number;
    name: string;
    employees: Employee[];
    tasks: Task[];
}