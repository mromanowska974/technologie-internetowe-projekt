import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../enums/types';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
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
      this.data = this.dataService.getAllEmployees()
    }
    else if(this.route.url.includes('tasks') && this.isManager==='true'){
      this.dataType = Type.TASK
      this.data = this.dataService.getAllTasks()
    }
    else if(this.route.url.includes('tasks') && this.isManager==='false'){
      this.dataType = Type.TASK
      this.data = this.dataService.getTasksByUser(this.user);
    }
    else if(this.route.url.includes('teams') && this.isManager==='true'){
      this.dataType = Type.TEAM
      this.data = this.dataService.getAllTeams()
    }
    else if(this.route.url.includes('teams') && this.isManager==='false'){
      this.dataType = Type.TEAM
      this.data = this.dataService.getTeamByUser(this.user)?.employees!;
    }
  }

  onAddData(dataType: Type){
    this.route.navigate(['/add-data', dataType.toString()])
  }
}
