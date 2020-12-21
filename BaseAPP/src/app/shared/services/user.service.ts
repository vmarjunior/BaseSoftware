import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";
import { UtilService } from './util/util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = {
    LoginRequest: environment.API + 'Users/Authenticate',
    GetAll: environment.API + 'Users/GetAll'
  };

  constructor(
    private http: HttpClient,
    private utilService: UtilService) { }

  //Methods
  LoginRequest(userName, password): Observable<any> {

    let data = {
      UserName: userName,
      Password: password
    };

    return this.http.post<any>(this.URL.LoginRequest, JSON.stringify(data), { headers: this.utilService.jsonHeader });
  }

  GetAll(){
    return this.http.get<any>(this.URL.GetAll);
  }


}
