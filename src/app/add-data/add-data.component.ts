import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../enums/types';
import { CommonModule, Location } from '@angular/common';
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Task } from '../models/task';
import { Team } from '../models/team';
import { HttpClientModule } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent implements OnInit{
  dataType: Type;
  data: any;
  hashedPassword: string;

  employees: Employee[] = [];
  teams: Team[] = [];

  employeesSelected: Employee[] = [];
  selectedTeam: Team;

  dataService: DataService = inject(DataService)

  mode: string = '';

  constructor(private router: Router, private activeRoute: ActivatedRoute, private location: Location){}

  ngOnInit(){
    //add new data
    if(this.router.url=='/add-data/employee' || this.router.url=='/main-page'){
      this.dataType = Type.EMPLOYEE;
      this.mode = 'Add';
      this.data = new Employee();
    }
    else if(this.router.url=='/add-data/task'){
      this.dataType = Type.TASK;
      this.mode = 'Add';
      this.data = new Task();
    }
    else if(this.router.url=='/add-data/team'){
      this.dataType = Type.TEAM;
      this.mode = 'Add';
      this.data = new Team();
    }

    //edit existing data
    if(this.router.url.includes('/edit-data/employee')){
      this.dataType = Type.EMPLOYEE;
      this.mode = 'Edit';
      let dataFrag = this.activeRoute.snapshot.params["dataFrag"];
      this.dataService.getEmployeeByEmail(dataFrag).subscribe(employee => {
        this.data = employee;
      })
    }
    else if(this.router.url.includes('/edit-data/task')){
      this.dataType = Type.TASK;
      this.mode = 'Edit';
      let dataFrag = this.activeRoute.snapshot.params["dataFrag"];
      this.dataService.getTaskByContent(dataFrag).subscribe(task => {
        this.data = task;
      })
    }
    else if(this.router.url.includes('/edit-data/team')){
      this.dataType = Type.TEAM;
      this.mode = 'Edit';
      let dataFrag = this.activeRoute.snapshot.params["dataFrag"];
      this.dataService.getTeamByName(dataFrag).subscribe(team => {
        this.data = team;
      })
    }

    //get all employees and teams
    this.dataService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
    this.dataService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  onAddData(){
    if(this.dataType=='employee'){
      let saltRounds = 3;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error(err);
          return;
        }
      
        bcrypt.hash(this.hashedPassword, salt, (err, hash) => {
          if (err) {
            console.error(err);
            return;
          }
      
          console.log('Hasło zahaszowane:', hash);
          this.data.password = hash;
          this.dataService.addEmployee(this.data)
        });
      });
    }
    else if(this.dataType=='task'){
      //this.dataService.addTaskToTeam(this.selectedTeam, this.data)
      this.dataService.addTask(this.data, this.selectedTeam.id)
    }
    else if(this.dataType=='team'){
      this.data.employees = this.employeesSelected;
      this.dataService.addTeam(this.data)
    }
    this.location.back();
  }

  onEditData(){
    if(this.dataType=='employee'){
      let saltRounds = 3;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error(err);
          return;
        }
        
        bcrypt.hash(this.hashedPassword, salt, (err, hash) => {
          if (err) {
            console.error(err);
            return;
          }
          
          console.log('Hasło zahaszowane:', hash);
          this.data.password = hash;
          console.log(this.data)
          this.dataService.editEmployee(this.data)
        });
      });
    }
    else if(this.dataType=='task'){
      //this.dataService.addTaskToTeam(this.selectedTeam, this.data)
      this.dataService.editTask(this.data, this.selectedTeam.id)
    }
    else if(this.dataType=='team'){
      this.data.employees = this.employeesSelected;
      console.log(this.data)
      this.dataService.editTeam(this.data)
    }
    this.location.back();
  }

  onEmployeeClicked(employee: Employee, item: HTMLInputElement){
    if(item.checked){
      this.employeesSelected.push(employee)
    }
    else{
      this.employeesSelected = this.employeesSelected.filter(e => JSON.stringify(e) != JSON.stringify(employee))
    }
    console.log(this.employeesSelected)
  }
}
