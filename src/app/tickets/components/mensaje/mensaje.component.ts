
import {  Component, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../../interfaces/mensaje.interface';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../../../lib/prime.module';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  standalone: true,
  selector: 'app-mensaje',    
  imports:[CommonModule,PrimeModule,SharedModule],  
  templateUrl: './mensaje.component.html',
   styleUrl: './mensaje.component.css',
  
})
export class MensajeComponent  {
  

@Input('mensajeModel') mensajeModel!: Mensaje;


}
