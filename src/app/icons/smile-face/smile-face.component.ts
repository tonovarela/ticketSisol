import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-smile-face',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './smile-face.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmileFaceComponent {
  @Input('class') class: string = 'h-5 w-5';

 }
