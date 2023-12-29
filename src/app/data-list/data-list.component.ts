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

  constructor(private router: Router){
    
  }

  ngOnInit(){
    if(this.router.url=='/main-page/employees' || this.router.url=='/main-page'){
      this.dataType = Type.EMPLOYEE
      this.data = this.dataService.employees
    }
    else if(this.router.url=='/main-page/tasks'){
      this.dataType = Type.TASK
      this.data = this.dataService.tasks
    }
    else if(this.router.url=='/main-page/teams'){
      this.dataType = Type.TEAM
      this.data = this.dataService.teams
    }
  }

  onAddData(dataType: Type){
    this.router.navigate(['/add-data', dataType.toString()])
  }
}
