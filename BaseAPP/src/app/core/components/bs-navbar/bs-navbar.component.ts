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
  isUserMenuExpanded = false;
  currentUser: User;

  constructor(private auth: AuthService) {
  }

  async ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;

      if (!user)
        this.isUserMenuExpanded = false;
    });
  }

  expandUserMenu(){
    this.isUserMenuExpanded = !this.isUserMenuExpanded;
  }
}
