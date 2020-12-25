import { Component, Input, OnInit } from '@angular/core';
import { User } from 'shared/models/User';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

  @Input('currentUser') currentUser: User;

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
