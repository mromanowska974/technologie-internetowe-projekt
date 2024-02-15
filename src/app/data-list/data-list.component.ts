import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Type } from '../enums/types';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css',
})
export class DataListComponent implements OnInit{
  dataType: Type;
  data: any[];

  dataService: DataService = inject (DataService);

  isManager: string;
  user: string;

  constructor(private route: Router, private router: ActivatedRoute){}

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.isManager = params['manager'];
      this.user = params['user'];
    });

    if(this.route.url.includes('employees')){
      this.dataType = Type.EMPLOYEE
      this.dataService.getAllEmployees().subscribe(employees => {
        this.data = employees;
      });
    }
    else if(this.route.url.includes('tasks') && this.isManager==='true'){
      this.dataType = Type.TASK
      this.dataService.getAllTasks().subscribe(tasks => {
        this.data = tasks;
      });
    }
    else if(this.route.url.includes('tasks') && this.isManager==='false'){
      this.dataType = Type.TASK
      //this.dataService.getTasksByUser(this.user);
    }
    else if(this.route.url.includes('teams') && this.isManager==='true'){
      this.dataType = Type.TEAM
      this.dataService.getAllTeams().subscribe(teams => {
        this.data = teams;
      });
    }
    else if(this.route.url.includes('teams') && this.isManager==='false'){
      this.dataType = Type.TEAM
      let employee1: Employee;
      this.dataService.getEmployeeByEmail(this.user).subscribe(employee => {
        employee1 = employee;
        this.dataService.getTeamByUser(employee1.id).subscribe(team => {
          this.data = team[0].employees;
        });
      })
    }
  }

  onAddData(dataType: Type){
    this.route.navigate(['/add-data', dataType.toString()])
  }
}
