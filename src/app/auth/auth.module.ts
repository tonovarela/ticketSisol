import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import {  RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent
  ]  ,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,    
    AuthRoutingModule
  ]
})
export class AuthModule { }
