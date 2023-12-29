export class Employee{
    id: number;
    name: string;
    surname: string;
    position: string;
    email: string;
    password: string;

    constructor(id: number, name: string, surname: string, position: string, email: string, password: string){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.email = email;
        this.password = password;
    }
}