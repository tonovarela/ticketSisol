import { computed, Injectable, signal } from '@angular/core';
import { Categoria, Estado, Ticket, Zona } from '../interfaces/ticket.interface';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets = signal<Ticket[]>([]);

  estados :Estado[]= [
    { id_estado: 1, descripcion: 'Pendiente de atender' },
    { id_estado: 2, descripcion: 'Atendiendose' },
    { id_estado: 4, descripcion: 'Pausado' },
    { id_estado: 3, descripcion: 'Cancelado' },
  ];

   categorias: Categoria[] = [
    { id_categoria: 1, descripcion: 'Internet' },
    { id_categoria: 2, descripcion: 'Telefono' },
    { id_categoria: 3, descripcion: 'Cable' },
    { id_categoria: 4, descripcion: 'Otros' }
  ];
   zonas: Zona[] = [
    { id_zona: 1, descripcion: 'Zona 1' },
    { id_zona: 2, descripcion: 'Zona 2' },
    { id_zona: 3, descripcion: 'Zona 3' },
    { id_zona: 4, descripcion: 'Zona 4' }
  ];

  Tickets = computed(() => this.tickets());
  constructor() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.tickets.set([
      { id_estado: 1, id_ticket: '12', zona: 'Zona 1', solicitante: 'Juan Perez', titulo: 'Problema con el internet', registro: new Date(), dias_respuesta: 2, fecha_respuesta: undefined, categoria: 'Internet', es_queja: false, asignado: 'Pedro', situacion: 'En proceso',  },
      { id_estado: 1, id_ticket: '200', zona: 'Zona 2', solicitante: 'Maria Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 3, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: true, asignado: 'Juan', situacion: 'En proceso', },
      { id_estado: 1, id_ticket: '388', zona: 'Zona 3', solicitante: 'Pedro Perez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 4, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: false, asignado: 'Maria', situacion: 'En proceso' },
      { id_estado: 1, id_ticket: '48', zona: 'Zona 4', solicitante: 'Ana Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 5, fecha_respuesta: undefined, categoria: 'Telefono', es_queja: true, asignado: 'Pedro', situacion: 'En proceso' },      
    ]);
  }

  registrar(ticket: Ticket) {
    this.tickets.set([ticket,...this.tickets()]);    
  }

  actualizar(ticket: Ticket) {
    this.tickets.set(this.tickets().map(t => t.id_ticket === ticket.id_ticket ? ticket : t));
  }

  
}
