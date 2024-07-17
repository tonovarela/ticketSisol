
import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje',  
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css',
  
})
export class MensajeComponent { 

@Input('mensaje') mensaje: string ="";
@Input('propio') propio:boolean = false;
@Input('foto') foto:string = '';

}
