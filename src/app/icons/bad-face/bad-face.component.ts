import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-bad-face',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './bad-face.component.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadFaceComponent {
  @Input('class') class: string = 'h-5 w-5';

 }
