
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Mensaje, TipoMensaje } from '@interfaces/mensaje.interface';
import { Bitacora, OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { FireService } from '@services/firebase.service';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';
import { blobToBase64 } from '@utils/blobtoBase64';
import { firstValueFrom } from 'rxjs';


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
    this.id_usuario = this.usuarioService.StateAuth().usuario?.id.toString() || "0";
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
    const mensajes = this.construirHistorialMensajes(resp.bitacora);
    this.mensajesDetalle.set(mensajes)
    // [
    //   {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket registrados  ', propio: false },
    //   {categoria:'USER',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'Gerente',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Informacion de ticket ', propio: false },            
    //   {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket cambio a pausado  ', propio: false },
    //   {categoria:'USER',avatar:'https://github.com/shadcn.png',usuario:'Varela',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Adicional del ticket ', propio: true },      
    // ]

    this.bitacoraTicket = id_ticket
  }
  cerrarBitacora() {
    this.bitacoraTicket = undefined
  }



  private construirHistorialMensajes(bitacora: Bitacora[]): Mensaje[] {
    const mensajes: Mensaje[] = bitacora.map(m => {
      let newMensaje: Mensaje;
      if (m.categoria === "DOCUMENT") {
        newMensaje = {
          categoria: 'USER',
          avatar: m.foto,
          usuario: m.username,
          mensaje: '',
          archivo: {
            url: `https://servicios.litoprocess.com/sisol/api/documento/${m.id}`,
            nombre: m.mensaje,
          },
          fecha: m.fecha_registro,
          id: m.id,
          tipo: m.extension.includes("image") ? TipoMensaje.IMAGEN : TipoMensaje.ARCHIVO,
          propio: m.id_usuario.trim() === this.id_usuario
        }
      } else {
        newMensaje = {
          categoria: m.categoria === 'SYSTEM' ? 'SYSTEM' : 'USER',
          avatar: m.foto,
          usuario: m.username,
          mensaje: m.categoria == "SYSTEM" ? `${m.movimiento} ${m.mensaje} ` : m.mensaje,
          archivo: undefined,
          tipo: TipoMensaje.TEXTO,
          fecha: m.fecha_registro,
          id: m.id,
          propio: m.id_usuario.trim() === this.id_usuario
        };
      }
      return newMensaje;
    });
    return mensajes;
  }

  async nuevoMensaje(nuevoMensaje: Mensaje) {
    let idMensaje = '';
    if (nuevoMensaje.tipo == TipoMensaje.TEXTO) {
      const resp = await firstValueFrom(this.ticketService.registrarNota({
        id_ticket: this.bitacoraTicket || '',
        id_usuario: this.id_usuario,
        mensaje: nuevoMensaje.mensaje
      }));
      idMensaje = resp.id;
    } else {
      const blob = await fetch(nuevoMensaje.archivo!.url).then(r => r.blob());
      const base64string = await blobToBase64(blob);
      const resp = await firstValueFrom(this.ticketService.registrarDocumento({
        name: nuevoMensaje.archivo!.nombre,
        base64string: base64string.split(',')[1],
        extension: blob.type,
        id_ticket: this.bitacoraTicket || '',
        id_usuario: this.id_usuario
      }));
      idMensaje = resp.id;
    }
    nuevoMensaje.id = idMensaje;
    this.mensajesDetalle.set([...this.mensajesDetalle(), nuevoMensaje]);
  }

}
