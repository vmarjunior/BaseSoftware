import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventManager } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  public isFullTable: Observable<boolean>;
  private tableSubject: Subject<boolean>;
  public jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private eventManager: EventManager) {
    this.tableSubject = new Subject<boolean>();
    this.isFullTable = this.tableSubject.asObservable();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  onResize(event) {
    this.verifyWidth();
  }

  verifyWidth() {
    this.tableSubject.next(window.innerWidth > 768);
  }

  formatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

}
