import { UserService } from 'shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) {
    userService.GetAll().subscribe(x => console.log(x));
  }

  ngOnInit() {
  }

}
