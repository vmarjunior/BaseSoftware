import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from 'shared/services/util/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Interceptor } from './services/util/auth.interceptor';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CustomFormsModule,
    FormsModule,
    HttpClientModule,
    Interceptor
  ],
  declarations: [],
  exports: [
    NgbModule,
    FormsModule,
    CustomFormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ],
})
export class SharedModule { }
