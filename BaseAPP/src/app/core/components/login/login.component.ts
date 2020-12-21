import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username : "",
    password : ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.Authenticate(this.user.username, this.user.password);
  }

}
