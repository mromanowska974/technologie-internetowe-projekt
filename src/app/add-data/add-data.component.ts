import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../enums/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent implements OnInit{
  dataType: Type;

  constructor(private router: Router){}

  ngOnInit(){
    if(this.router.url=='/add-data/employee' || this.router.url=='/main-page'){
      this.dataType = Type.EMPLOYEE
    }
    else if(this.router.url=='/add-data/task'){
      this.dataType = Type.TASK
    }
    else if(this.router.url=='/add-data/team'){
      this.dataType = Type.TEAM
    }
  }
}
