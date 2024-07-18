
import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',  
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',  
})
export class AvatarComponent { 
  @Input('username') username='';
  @Input('url') url: string='https://www.github.com/shadcn.png';
}
