import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  dataService: DataService = inject(DataService);

  constructor(private router: Router){}

  onLogIn(){
    let user: Employee | undefined = this.dataService.getEmployeeByEmail(this.email)
    console.log(user)

    if(user !== undefined && this.email==user.email && this.password==user.password){
      if(user.position==='Kierownik'){
        this.router.navigate(['/main-page'], {queryParams: {manager: true, user: user.email}});
      }
      else{
        this.router.navigate(['/main-page'], {queryParams: {manager: false, user: user.email}});
      }
    }
  }
}
