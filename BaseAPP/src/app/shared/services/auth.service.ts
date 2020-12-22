import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = {
    LoginRequest: environment.API + "Users/Authenticate",
  };

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public Authenticate(login: string, password: string) {
    this._http
      .post<any>(this.URL.LoginRequest, {
        Username: login,
        Password: password,
      })
      .subscribe(
        (user) => {
          this.currentUserSubject.next(user);

          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("token", user.token);

          this.toastr.success("Logado com sucesso!", "Sucesso!");
          this.router.navigate(["home"]);
        },
        (err) => {
          this.toastr.error(err.error.message, "Erro!");
        }
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

}
