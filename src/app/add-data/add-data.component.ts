import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../enums/types';
import { CommonModule, Location } from '@angular/common';
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Task } from '../models/task';
import { Team } from '../models/team';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent implements OnInit{
  dataType: Type;
  data: any;

  employees: Employee[] = [];
  teams: Team[] = [];

  employeesSelected: Employee[] = [];
  selectedTeam: Team;

  dataService: DataService = inject(DataService)

  constructor(private router: Router, private location: Location){}

  ngOnInit(){
    if(this.router.url=='/add-data/employee' || this.router.url=='/main-page'){
      this.dataType = Type.EMPLOYEE;
      this.data = new Employee();
    }
    else if(this.router.url=='/add-data/task'){
      this.dataType = Type.TASK
      this.data = new Task();
    }
    else if(this.router.url=='/add-data/team'){
      this.dataType = Type.TEAM
      this.data = new Team();
    }

    this.employees = this.dataService.getAllEmployees();
    this.teams = this.dataService.getAllTeams();
  }

  onAddData(){
    if(this.dataType=='employee'){
      this.dataService.addEmployee(this.data)
      console.log(this.dataService.getAllEmployees())
    }
    else if(this.dataType=='task'){
      this.dataService.addTaskToTeam(this.selectedTeam, this.data)
      this.dataService.addTask(this.data)
    }
    else if(this.dataType=='team'){
      this.data.employees = this.employeesSelected;
      this.dataService.addTeam(this.data)
      console.log(this.dataService.getAllTeams())
    }

    console.log(this.data)
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
