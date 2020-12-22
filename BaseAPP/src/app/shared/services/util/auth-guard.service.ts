import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  jwtHelper = new JwtHelperService();

  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    } else {
        return true;
    }
  }

}
