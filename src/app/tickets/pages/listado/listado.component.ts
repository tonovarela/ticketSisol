
import { Component } from '@angular/core';
import { Estado, Ticket } from '../../../interfaces/ticket.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent {
  first = 0;
  rows = 5;

  verDetalleTicket: boolean = false;
  ticketDetalle:Ticket| undefined;

  estados :Estado[]= [
    { id_estado: 1, descripcion: 'Pendiente de atender' },
    { id_estado: 2, descripcion: 'Atendiendose' },
    { id_estado: 3, descripcion: 'Cancelado' },
  ];


  visible: boolean = false;

  public tickets: Ticket[] = [
    {id_estado:1,id_ticket: '12', zona: 'Zona 1', solicitante: 'Juan Perez', titulo: 'Problema con el internet', registro: new Date(), dias_respuesta: 2, fecha_respuesta: new Date(), categoria: 'Internet', es_queja: false, asignado: 'Pedro', situacion: 'En proceso', estado: 'Pendiente de atender'},
    {id_estado:1,id_ticket: '200', zona: 'Zona 2', solicitante: 'Maria Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 3, fecha_respuesta: new Date(), categoria: 'Telefono', es_queja: true, asignado: 'Juan',  situacion: 'En proceso', estado: 'Atendiendose'},
    {id_estado:1,id_ticket:'388', zona: 'Zona 3', solicitante: 'Pedro Perez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 4, fecha_respuesta: new Date(), categoria: 'Telefono', es_queja: false, asignado: 'Maria',  situacion: 'En proceso', estado: 'Cancelado'},
    {id_estado:1,id_ticket: '48', zona: 'Zona 4', solicitante: 'Ana Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 5, fecha_respuesta: new Date(), categoria: 'Telefono', es_queja: true, asignado: 'Pedro',  situacion: 'En proceso', estado: 'Pendiente de atender'},
    {id_estado:1,id_ticket:'5', zona: 'Zona 5', solicitante: 'Juan Perez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 6, fecha_respuesta: new Date(), categoria: 'Telefono', es_queja: false, asignado: 'Ana',  situacion: 'En proceso', estado: 'Atendiendose'},
    {id_estado:1,id_ticket: '6', zona: 'Zona 6', solicitante: 'Maria Lopez', titulo: 'Problema con el telefono', registro: new Date(), dias_respuesta: 7, fecha_respuesta: new Date(), categoria: 'Telefono', es_queja: true, asignado: 'Juan',  situacion: 'En proceso', estado: 'Cancelado'},

    


  ];




 
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  // reset() {
  //   this.first = 0;
  // }

  isLastPage(): boolean {
    return this.tickets ? this.first === (this.tickets.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.tickets ? this.first === 0 : true;
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
