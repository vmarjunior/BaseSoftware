import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  user: User = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    id: 0
  };

  constructor() { }

  register(){

  }

}
