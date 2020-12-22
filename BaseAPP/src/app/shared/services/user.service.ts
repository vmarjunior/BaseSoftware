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
    GetAll: environment.API + 'Users/GetAll'
  };

  constructor(
    private http: HttpClient,
    private utilService: UtilService) { }

  //Methods
  GetAll(){
    return this.http.get<any>(this.URL.GetAll);
  }


}
