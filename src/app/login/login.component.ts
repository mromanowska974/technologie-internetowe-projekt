import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: String = '';
  password: String = '';

  constructor(private router: Router){

  }

  onLogIn(){
    if(this.email=='admin' && this.password=='admin'){
        this.router.navigate(['/main-page']);
    }
  }
}
