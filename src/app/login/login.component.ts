import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../models/employee';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  email: string = '';
  password: string = '';

  user;

  dataService: DataService = inject(DataService);

  constructor(private router: Router){}

  onLogIn(){
    this.dataService.getEmployeeByEmail(this.email).subscribe(employee => {
      this.user = employee;
      console.log(this.user)  
      if(this.user !== undefined && this.email==this.user.email){
        bcrypt.compare(this.password, this.user.password, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
      
          if (result) {
            if(this.user.position==='Kierownik'){
              this.router.navigate(['/main-page'], {queryParams: {manager: true, user: this.user.email}});
            }
            else{
              this.router.navigate(['/main-page'], {queryParams: {manager: false, user: this.user.email}});
            }
          } else {
              console.log('Hasła nie są zgodne');
          }
      });
      }
    })

  }
}
