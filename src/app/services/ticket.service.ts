import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Categoria, Estado, ResponseCatalogo, ResponseListadoTickets, Ticket, Zona } from '../interfaces/ticket.interface';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets =signal<Ticket[]>([]);
  //private ticketsBkp :Ticket[] = [];
  http = inject(HttpClient)
  estados =signal<Estado[]>([]);

  urlApi = environment.urlApi;
  categorias: Categoria[] = [];
  zonas: Zona[] = [];
  cargando = false;  
  totalRows = signal(20);
  estadoFiltro = signal(-1);
  patron = signal('');

  Tickets = computed(() => this.tickets());
  constructor() {
   
    this.cargarCatalogos();
  

  }

  cargarCatalogos() {
   this.http.get<ResponseCatalogo>(`${this.urlApi}/ticket/catalogos`).subscribe(catalogos => {
      this.estados.set(catalogos.estados);
      this.categorias = catalogos.categorias;
      this.zonas = catalogos.zonas;      
    });

  }

  cargarTickets(id_solicitante: string,id_estado:number = 0) {
    
    this.cargando=true
     this.http.get<ResponseListadoTickets>(`${this.urlApi}/ticket?id_solicitante=${id_solicitante}&id_estado=${id_estado==0?'ALL':id_estado}`).subscribe(response => { 
      this.cargando=false;
      this.tickets.set([]);
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
