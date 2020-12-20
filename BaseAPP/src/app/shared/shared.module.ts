import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    NgbModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ],
})
export class SharedModule { }