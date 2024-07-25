
import {  Component, inject, OnInit } from '@angular/core';
import {  OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { TicketService } from '@services/ticket.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',  
})
export class ListadoComponent implements OnInit {  
  ngOnInit(): void {    
    
  } 
  
  first = 0;
  rows = 10;    
  ticketDetalle:Ticket| undefined;
  ticketService = inject(TicketService);

  estados = this.ticketService.estados;  

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  
  isLastPage(): boolean {
    return this.ticketService.Tickets() ? this.first === (this.ticketService.Tickets().length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.ticketService.Tickets() ? this.first === 0 : true;
  }


  verDetalle(ticket:Ticket){
    //this.verDetalleTicket = true;    
    this.ticketDetalle=ticket
  }

  actualizarTicket({ticket,cambioFechaCompromiso}:OnUpdateTicketModel){   
    this.ticketService.actualizar(ticket);
    this.ticketDetalle = undefined;
  }
  cerrarDetalle(){    
    this.ticketDetalle=undefined;
  }

}
