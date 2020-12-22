import { AuthGuard } from 'shared/services/util/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    BsNavbarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
