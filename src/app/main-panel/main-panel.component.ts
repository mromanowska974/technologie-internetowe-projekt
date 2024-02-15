import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent implements OnInit{
  isManager: string;
  user: string;

  constructor(public route: Router, 
    private router: ActivatedRoute){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.isManager = params['manager'];
      this.user = params['user'];
    });
  }

  logOut(){
    this.route.navigate(['']);
  }
}
