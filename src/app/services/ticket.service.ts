import { computed, inject, Injectable, signal } from '@angular/core';
import { Categoria, Estado, ResponseCatalogo, ResponseListadoTickets, Ticket, Zona } from '../interfaces/ticket.interface';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  urlApi = environment.urlApi;
  private tickets = signal<Ticket[]>([]);
  http = inject(HttpClient)

  estados =signal<Estado[]>([]);
  categorias: Categoria[] = [];
  zonas: Zona[] = [];

  Tickets = computed(() => this.tickets());
  constructor() {
   // this.cargarTickets();
    this.cargarCatalogos();
  }

  cargarCatalogos() {
   this.http.get<ResponseCatalogo>(`${this.urlApi}/ticket/catalogos`).subscribe(catalogos => {
      this.estados.set(catalogos.estados);
      this.categorias = catalogos.categorias;
      this.zonas = catalogos.zonas;
      console.group('Estados');
      console.table(catalogos.estados);
      console.groupEnd();
    });

  }

  cargarTickets() {
     this.http.get<ResponseListadoTickets>(`${this.urlApi}/ticket`).subscribe(response => {   
      // console.group('Tickets');      
      // console.table(response.tickets);
      // console.groupEnd();
      this.tickets.set(response.tickets.map(t => ({...t,
                                                   es_queja: t["es_queja"] as any === '1'})));
     }); 
  }

  registrar(ticket: Ticket) {
    this.tickets.set([ticket,...this.tickets()]);    
  }

  actualizar(ticket: Ticket) {
    this.tickets.set(this.tickets().map(t => t.id_ticket === ticket.id_ticket ? ticket : t));
  }

  
}
