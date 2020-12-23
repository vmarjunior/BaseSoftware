import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from "environments/environment";
import { UtilService } from './util/util.service';
import { User } from 'shared/models/User';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = {
    GetAll: environment.API + 'Users/GetAll',
    Get: environment.API + 'Users/Get',
    Register: environment.API + 'Users/Register'
  };

  constructor(
    private http: HttpClient,
    private utilService: UtilService) { }

  //Methods
  GetAll() {
    return this.http.get<User[]>(this.URL.GetAll);
  }

  Get(id: number){
    return this.http.get<User>(this.utilService.formatString(this.URL.Get, id.toString()));
  }

  Register(user: User){
    return this.http.post<any>(this.URL.Register, { User: user });
  }
}
