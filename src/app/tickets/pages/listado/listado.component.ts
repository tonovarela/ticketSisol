
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Mensaje, TipoMensaje } from '@interfaces/mensaje.interface';
import { OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { FireService } from '@services/firebase.service';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';
import { firstValueFrom } from 'rxjs';
import { Categoria } from '../../../interfaces/ticket.interface';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  firebaseService = inject(FireService);
  usuarioService = inject(UsuarioService);
  ticketService = inject(TicketService);

  mensajesDetalle = signal<Mensaje[]>([]);

  tickets: Ticket[] = [];
  ticketsBkp: Ticket[] = [];
  bitacoraTicket: string | undefined;

  estados = this.ticketService.estados;

  rows = computed(() => this.ticketService.totalRows());
  ticketDetalle: Ticket | undefined;
  id_usuario = "0";
  cargandoTickets = this.ticketService.cargando;
  first = 0;

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
          || t.id_ticket?.toString().includes(patron)
          || t.descripcion.toLowerCase().includes(patron.toLowerCase())
          || t.asignado?.toLowerCase().includes(patron.toLowerCase())
          || t.solicitante?.toLowerCase().includes(patron.toLowerCase())
          || t.asignado?.toLowerCase().includes(patron.toLowerCase())
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

  async verBitacora(id_ticket: string) {

    const resp = await firstValueFrom(this.ticketService.bitacora(id_ticket))
    console.log(resp.bitacora)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];

    const mensajes: Mensaje[] = resp.bitacora.map(m => {
      let newMensaje: Mensaje;
      if (m.categoria === "DOCUMENT") {
        newMensaje = {
          categoria: 'USER',
          avatar: `https://servicios.litoprocess.com/colaboradores/api/foto/${m.id_usuario}`,
          usuario: m.username,
          mensaje: '',
          archivo: {
            url: `https://servicios.litoprocess.com/tickets/api/documento/${m.id}`,
            nombre: m.mensaje,
          },
          fecha: m.fecha_registro,
          id: m.id,
          tipo: validImageTypes.includes(m.extension)?TipoMensaje.IMAGEN : TipoMensaje.ARCHIVO,
          propio: m.id_usuario.trim() === this.id_usuario
        }
      } else {
        newMensaje = {
          categoria: m.categoria === 'SYSTEM' ? 'SYSTEM' : 'USER',
          avatar: `https://servicios.litoprocess.com/colaboradores/api/foto/${m.id_usuario}`,
          usuario: m.username,
          mensaje: m.categoria == "SYSTEM" ? m.movimiento : m.mensaje,
          archivo: undefined,
          tipo: TipoMensaje.TEXTO,
          fecha: m.fecha_registro,
          id: m.id,
          propio: m.id_usuario.trim() === this.id_usuario
        };
      }
      return newMensaje;
    });
    console.log(mensajes)
    this.mensajesDetalle.set(
      mensajes
      // [
      //   {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket registrados  ', propio: false },
      //   {categoria:'USER',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'Gerente',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Informacion de ticket ', propio: false },            
      //   {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket cambio a pausado  ', propio: false },
      //   {categoria:'USER',avatar:'https://github.com/shadcn.png',usuario:'Varela',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Adicional del ticket ', propio: true },      
      // ]
    )

    this.bitacoraTicket = id_ticket
  }
  cerrarBitacora() {
    this.bitacoraTicket = undefined
  }

}
