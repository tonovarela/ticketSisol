
import {  Component, inject, OnInit } from '@angular/core';
import {  OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { FireService } from '@services/firebase.service';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',  
})
export class ListadoComponent implements OnInit {  
  firebaseService= inject(FireService);
  usuarioService = inject(UsuarioService)
  first = 0;
  rows = 50;    
  ticketDetalle:Ticket| undefined;
  ticketService = inject(TicketService);
  estados = this.ticketService.estados;  


  ngOnInit(): void { 
    const id_usuario = this.usuarioService.StateAuth().usuario?.id;    
    this.ticketService.cargarTickets(id_usuario!);    
  } 
  

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
