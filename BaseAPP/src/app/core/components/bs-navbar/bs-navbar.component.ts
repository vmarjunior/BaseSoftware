import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/User';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isCollapsed = true;
  appUser: User;

  constructor(private auth: AuthService) {
  }


  async ngOnInit() {
    this.auth.currentUserValue;
  }

  logout() {
    this.auth.logout();
  }
}
