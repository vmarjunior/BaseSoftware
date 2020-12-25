import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private auth: AuthService,
    private toastrService: ToastrService
    ) { }

  async ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;

      if (!user)
        this.isUserMenuExpanded = false;
    });
  }

  expandUserMenu(){
    this.toastrService.clear();
    this.isUserMenuExpanded = !this.isUserMenuExpanded;
  }
}
