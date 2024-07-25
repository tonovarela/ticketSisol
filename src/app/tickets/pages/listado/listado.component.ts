
import {  Component, inject, OnInit } from '@angular/core';
import { Estado, Ticket } from '../../../interfaces/ticket.interface';
import { TicketService } from '../../../services/ticket.service';

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
  verDetalleTicket: boolean = false;
  ticketDetalle:Ticket| undefined;
  ticketService = inject(TicketService);

  estados :Estado[]= [
    { id_estado: 1, descripcion: 'Pendiente de atender' },
    { id_estado: 2, descripcion: 'Atendiendose' },
    { id_estado: 3, descripcion: 'Cancelado' },
  ];

  

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
    this.verDetalleTicket = true;    
    this.ticketDetalle=ticket
  }

  actualizarTicket(ticket:Ticket){
    console.log('Actualizar ticket', ticket); 
  }
  cerrarDetalle(){
    console.log('Cerrar detalle');
    this.ticketDetalle=undefined;
  }

}
