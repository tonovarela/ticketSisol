import { CommonModule } from '@angular/common';
import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-attachment-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './attachment.component.html',
  
})
export class AttachmentComponent { 
  @Input('class') class: string = 'h-5 w-5';

}
