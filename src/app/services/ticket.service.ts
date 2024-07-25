import { computed, Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets = signal<Ticket[]>([

  ]);

  Tickets = computed(() => this.tickets());
  constructor() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.tickets.set([
      { id_estado: 1, id_ticket: '12', zona: 'Zona 1', solicitante: 'Juan Perez', titulo: 'Problema con el internet', registro: new Date(), dias_respuesta: 2, fecha_respuesta: undefined, categoria: 'Internet', es_queja: false, asignado: 'Pedro', situacion: 'En proceso', estado: 'Pendiente de atender' },
      { id_estado: 1, id_ticket: '200', zona: 'Zona 2', solicitante: 'Maria Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 3, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: true, asignado: 'Juan', situacion: 'En proceso', estado: 'Atendiendose' },
      { id_estado: 1, id_ticket: '388', zona: 'Zona 3', solicitante: 'Pedro Perez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 4, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: false, asignado: 'Maria', situacion: 'En proceso', estado: 'Cancelado' },
      { id_estado: 1, id_ticket: '48', zona: 'Zona 4', solicitante: 'Ana Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 5, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: true, asignado: 'Pedro', situacion: 'En proceso', estado: 'Pendiente de atender' },      
    ]);
  }




  registrar(ticket: Ticket) {
    this.tickets.set([ticket,...this.tickets()]);
    
  
  }

}
