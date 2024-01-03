import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Task } from './models/task';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      position: 'Kierownik',
      email: 'admin',
      password: 'admin'
    },
    {
      id: 2,
      name: 'Anna',
      surname: 'Nowak',
      position: 'Pracownik',
      email: 'user',
      password: 'user'
    },
  ];
  private tasks: Task[] = [
    {
      id: 1,
      content: 'task1',
      status: 'xd'
    },
    {
      id: 2,
      content: 'task2',
      status: 'xd'
    }
  ];
  private teams: Team[] = [
    {
      id: 1,
      name: 'team1',
      employees: [this.employees[0]],
      tasks: [this.tasks[0]]
    },
    {
      id: 2,
      name: 'team2',
      employees: [this.employees[1]],
      tasks: [this.tasks[1]]
    }
  ];

  constructor() { }

  getAllEmployees(){
    return this.employees;
  }

  getAllTasks(){
    return this.tasks;
  }

  getAllTeams(){
    return this.teams;
  }

  addEmployee(employee: Employee){
    this.employees.push(employee);
  }

  addTask(task: Task){
    this.tasks.push(task)
  }

  addTeam(team: Team){
    this.teams.push(team)
  }

  addTaskToTeam(team: Team, task: Task){
    team.tasks.push(task);
  }

  //delety
  //edity
  //gety dla 1

  getEmployeeByEmail(email: string){
    return this.employees.find(employee => employee.email == email)
  }

  getTeamByUser(email: string){
    let user = this.getEmployeeByEmail(email);
    return this.teams.find(team => team.employees.includes(user!))
  }

  getTasksByUser(email: string){
    let team = this.getTeamByUser(email);
    return this.tasks.filter(task => team?.tasks.includes(task))
  }

}
