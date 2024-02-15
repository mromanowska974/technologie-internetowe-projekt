import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule, Location } from '@angular/common';
import { Employee } from '../models/employee';
import { Task } from '../models/task';
import { Team } from '../models/team';
import { Type } from '../enums/types';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  dataFrag: string;
  data: any;
  dataType: Type;

  dataService: DataService = inject(DataService);
  isManager: string;

  constructor(private router: ActivatedRoute, private location: Location, private route: Router){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.isManager = params['isManager'];
      console.log(this.isManager)
      if(params['email']){
        this.dataFrag = params['email'].toString();
        this.dataService.getEmployeeByEmail(this.dataFrag).subscribe(employee => {
          this.data = employee;
        });
        this.dataType = Type.EMPLOYEE;
      }
      else if(params['content']){
        this.dataFrag = params['content'];
        this.dataService.getTaskByContent(this.dataFrag).subscribe(task => {
          this.data = task;
        });
        this.dataType = Type.TASK;
        console.log(this.data)
      }
      else if(params['name']){
        this.dataFrag = params['name'];
        console.log(this.dataFrag)
        this.dataService.getTeamByName(this.dataFrag).subscribe(team =>{
          this.data = team;
          console.log(this.data)
        });
        this.dataType = Type.TEAM;
      }
    });
  }

  onEditData(){
    if(this.dataType==='employee'){
      this.route.navigate(['/edit-data', this.dataType.toString(), this.data.email])
    }
    else if(this.dataType==='task'){
      this.route.navigate(['/edit-data', this.dataType.toString(), this.data.content])
    }
    else if(this.dataType==='team'){
      this.route.navigate(['/edit-data', this.dataType.toString(), this.data.name])
    }
    
  }

  onDeleteData(){
    if(this.dataType==='employee'){
      this.dataService.deleteEmployee(this.data)
      this.location.back();
    }
    else if(this.dataType==='task'){
      this.dataService.deleteTask(this.data)
      this.location.back();
    }
    else if(this.dataType==='team'){
      this.dataService.deleteTeam(this.data)
      this.location.back();
    }
  }
}
