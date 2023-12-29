import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Task } from './models/task';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  employees: Employee[];
  tasks: Task[];
  teams: Team[];

  constructor() { }

  getEmployees(){

  }

  getTasks(){

  }

  getTeams(){

  }

  //addy
  //delety
  //edity
  //gety dla 1
}
