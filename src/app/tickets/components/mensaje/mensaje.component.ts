
import {  Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Mensaje } from '@interfaces/mensaje.interface';
import { PrimeModule } from '@lib/prime.module';
import { SharedModule } from '@shared/shared.module';
import { TicketService } from '@services/ticket.service';


@Component({
  standalone: true,
  selector: 'app-mensaje',    
  imports:[CommonModule,PrimeModule,SharedModule],  
  templateUrl: './mensaje.component.html',
   styleUrl: './mensaje.component.css',
  
})
export class MensajeComponent  {
  

@Input('mensajeModel') mensajeModel!: Mensaje;
ticketService = inject(TicketService);


mostrarImagen(estatus:boolean){
  this.ticketService.vistaPreviaImagenChat.set(estatus);
}

}
