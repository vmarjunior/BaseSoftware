import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = {
    LoginRequest: environment.API + 'Users/Authenticate',
    GetAll: environment.API + 'Users/GetAll'
  };

  jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) { }

  public Authenticate(login: string, password: string) {
    this._http.post<any>(this.URL.LoginRequest, {
      Username: login,
      Password: password
    }).subscribe(data => {

        localStorage.setItem('person', JSON.stringify(data));
        localStorage.setItem('token', data.token);

        this.toastr.success("Logado com sucesso!", "Sucesso!");
        this.router.navigate(['home']);
      },
      err => {
        this.toastr.error(err.error.message, "Erro!");
      });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
