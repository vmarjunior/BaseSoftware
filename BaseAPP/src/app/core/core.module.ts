import { AuthGuard } from 'shared/services/util/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'secret', component: LoginComponent, canActivate: [AuthGuard] }, //must be done
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileCardComponent
  ],
  exports: [
    BsNavbarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
