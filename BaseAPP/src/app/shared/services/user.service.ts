import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from "environments/environment";
import { UtilService } from './util/util.service';
import { AppUser } from 'shared/models/AppUser';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = {
    GetAll: environment.API + 'Users/GetAll',
    Get: environment.API + 'Users/Get'
  };

  constructor(
    private http: HttpClient,
    private utilService: UtilService) { }

  //Methods
  GetAll(){
    return this.http.get<any>(this.URL.GetAll);
  }

  Get(id: number){
    return this.http.get<any>(this.utilService.formatString(this.URL.Get, id.toString()));
  }

}
