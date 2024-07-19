import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
  AvatarComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    AvatarComponent
  ],
  imports:[CommonModule,RouterModule]
})
export class SharedModule { }
