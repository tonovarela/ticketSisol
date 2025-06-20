import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Categoria, DocumentoAlta, Estado, OnUpdateTicketModel, ResponseBitacora, ResponseCatalogo, ResponseListadoTickets, Ticket, Zona } from '../interfaces/ticket.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets = signal<Ticket[]>([]);
  http = inject(HttpClient)
  estados = signal<Estado[]>([]);
  zonas = signal<Zona[]>([]); 


  tipoUsuario = signal('3') ;  

  urlApi = environment.urlApi;
  categorias: Categoria[] = [];
  
  cargando = false;
  totalRows = signal(20);
  estadoFiltro = signal(-1);
  patron = signal('');


  vistaPreviaImagenChat = signal(false);


  Tickets = computed(() => this.tickets());

  constructor() {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.http.get<ResponseCatalogo>(`${this.urlApi}/ticket/catalogos`).subscribe(catalogos => {

      this.estados.set(catalogos.estados);
      this.categorias = catalogos.categorias;
      this.zonas.set(catalogos.zonas);
    });

  }


  bitacora(id_ticket: string) {
    return this.http.get<ResponseBitacora>(`${this.urlApi}/ticket/bitacora/${id_ticket}`)
  }

  cargarTickets(id_solicitante: string, id_estado: number = 0) {

    this.cargando = true
    this.http.get<ResponseListadoTickets>(`${this.urlApi}/ticket?id_solicitante=${id_solicitante}&id_estado=${id_estado == 0 ? 'ALL' : id_estado}`).subscribe(response => {
      this.tipoUsuario.set(response.tipoUsuario);
      this.cargando = false;
      this.tickets.set([]);
      this.tickets.set(response.tickets.map(t => ({
        ...t,
        es_queja: t["es_queja"] as any === '1'
      })));
    });
  }

  registrar(ticket: Ticket, documento?: DocumentoAlta) {
    return this.http.post(`${this.urlApi}/ticket`, { ticket, documento: documento || null })
  }

  async actualizar(updateTicketModel:OnUpdateTicketModel) {
    try {
      const {ticket} =updateTicketModel
      await firstValueFrom(this.http.patch(`${this.urlApi}/ticket/actualizar`, {...updateTicketModel}));      
      this.tickets.set(this.tickets().map(t => t.id_ticket === ticket.id_ticket ? ticket : t));
    } catch (e) {      
    }
  }

  

  registrarNota(nota: {
    id_ticket: string,
    id_usuario: string,
    mensaje: string,
  }) {
    return this.http.post<{ id: string }>(`${this.urlApi}/ticket/nota`, { nota })
  }

  registrarDocumento(documento: {
    id_ticket: string,
    base64string: string,
    name: string,
    extension: string
    id_usuario: string
  }) {
    return this.http.post<{ id: string }>(`${this.urlApi}/documento`, { documento })
  }


}
