import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';


import {RouterModule} from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UsersModule { }
