
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { FireService } from '@services/firebase.service';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  firebaseService = inject(FireService);
  usuarioService = inject(UsuarioService);

  tickets: Ticket[] = [];
  ticketsBkp: Ticket[] = [];
  
  first = 0;
  rows = computed(() => this.ticketService.totalRows());



  ticketDetalle: Ticket | undefined;
  ticketService = inject(TicketService);
  estados = this.ticketService.estados;
  id_usuario = "0";

  cargandoTickets = this.ticketService.cargando;
  //computed(() => this.ticketService.cargando());


  ngOnInit(): void {
    this.id_usuario = this.usuarioService.StateAuth().usuario?.id!;
    this.ticketService.cargarTickets(this.id_usuario);

  }



  constructor() {
    effect(() => {
      this.tickets = this.ticketService.Tickets();      
      this.ticketsBkp = this.ticketService.Tickets();
    });
    effect(() => {
      const id_estado = this.ticketService.estadoFiltro();
      this.ticketService.cargarTickets(this.id_usuario, id_estado);
      
    })

    effect(() => {
      const patron = this.ticketService.patron();      
      if (patron.length > 0) {
        this.tickets = this.tickets.filter(t =>
          t.titulo.toLowerCase().includes(patron.toLowerCase())
          || t.descripcion.toLowerCase().includes(patron.toLowerCase())
          || t.asignado.toLowerCase().includes(patron.toLowerCase())
          || t.solicitante.toLowerCase().includes(patron.toLowerCase())
          || t.asignado.toLowerCase().includes(patron.toLowerCase())
          || t.categoria.toLowerCase().includes(patron.toLowerCase())
        );
      } else {
        this.tickets = this.ticketsBkp;

      }

    });
  }


 

  next() {
    this.first = this.first + this.rows();
  }

  prev() {
    this.first = this.first - this.rows();
  }


  isLastPage(): boolean {
    return this.ticketService.Tickets() ? this.first === (this.ticketService.Tickets().length - this.rows()) : true;
  }

  isFirstPage(): boolean {
    return this.ticketService.Tickets() ? this.first === 0 : true;
  }


  verDetalle(ticket: Ticket) {

    this.ticketDetalle = ticket
  }

  actualizarTicket({ ticket, cambioFechaCompromiso }: OnUpdateTicketModel) {
    this.ticketService.actualizar(ticket);
    this.ticketDetalle = undefined;
  }
  cerrarDetalle() {
    this.ticketDetalle = undefined;
  }

}
