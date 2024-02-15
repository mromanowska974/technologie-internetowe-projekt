import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Task } from './models/task';
import { Team } from './models/team';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllEmployees(){
    return this.http
        .get('http://localhost:8080/employees')
        .pipe(map(responseData => {
            const employeesArr: Employee[] = [];
            for(const key in responseData){
                employeesArr.push({...responseData[key]})
            }
            return employeesArr;
        }));
  }

  getAllTasks(){
    return this.http
        .get('http://localhost:8080/tasks')
        .pipe(map(responseData => {
            const tasksArr: Task[] = [];
            for(const key in responseData){
                tasksArr.push({...responseData[key]})
            }
            return tasksArr;
        }));
  }

  getAllTeams(){
    return this.http
        .get('http://localhost:8080/teams')
        .pipe(map(responseData => {
            const teamsArr: Team[] = [];
            for(const key in responseData){
                teamsArr.push({...responseData[key]})
            }
            return teamsArr;
        }));
  }

  addEmployee(employee: Employee){
    return this.http.post('http://localhost:8080/employees', {
      name: employee.name,
      surname: employee.surname,
      position: employee.position,
      email: employee.email,
      password: employee.password
    }).subscribe();
  }

  addTask(task: Task, teamId: number){
    return this.http.post('http://localhost:8080/tasks/'+teamId, {
      content: task.content,
      status: task.status,
    }).subscribe();
  }

  addTeam(team: Team){
    return this.http.post('http://localhost:8080/teams', {
      name: team.name,
      employees: team.employees,
      tasks: team.tasks
    }).subscribe();
  }

  deleteEmployee(employee: Employee){
    this.http.delete('http://localhost:8080/employees/'+employee.id)
        .subscribe();
  }

  deleteTask(task: Task){
    this.http.delete('http://localhost:8080/tasks/'+task.id)
        .subscribe();
  }

  deleteTeam(team: Team){
    this.http.delete('http://localhost:8080/teams/'+team.id)
        .subscribe();
  }

  editEmployee(employee: Employee){
    this.http
    .put('http://localhost:8080/employees/'+employee.id, {
        name: employee.name, 
        surname: employee.surname, 
        position: employee.position,
        email: employee.email,
        password: employee.password
    })
    .subscribe();
  }

  editTask(task: Task, teamId: number){
    
  }

  editTeam(team: Team){
    this.http
    .put('http://localhost:8080/team/'+team.id, {
        name: team.name, 
        employees: team.employees
    })
    .subscribe();
  }

  getEmployeeByEmail(email: string){ //email is unique
    return this.http
    .get<Employee>('http://localhost:8080/employees/'+email)
    .pipe(map(response => response));
  }

  getTeamByName(name: string){ //name is unique
    return this.http
    .get('http://localhost:8080/teams/'+name)
    .pipe(map(response => response));
  }

  getTaskByContent(content: string){ //content is unique
    return this.http
    .get('http://localhost:8080/tasks/'+content)
    .pipe(map(response => response));
  }

  getTeamByUser(id: number){
    return this.http
    .get<Team[]>('http://localhost:8080/team/'+id)
    .pipe(map(response => response));
  }

  // getTasksByUser(email: string){
  //   let team = this.getTeamByUser(email);
  //   return this.tasks.filter(task => team?.tasks.includes(task))
  // }

}
