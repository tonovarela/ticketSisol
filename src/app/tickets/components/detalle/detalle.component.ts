import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeModule } from '@lib/prime.module';
import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { Estado, OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { isMobile } from '../../../utils/mobileDetector';
import { CALENDAR_LANG_ES } from 'src/app/conf/locale';


@Component({
  standalone: true,
  imports: [CommonModule, PrimeModule, FormsModule],
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',

})

export class DetalleComponent implements OnInit {
  @Input('catalogoEstados') catalogoEstados: Estado[] = [];
  @Input('ticket') ticketParam!: Ticket;
  @Output('onClose') onClose = new EventEmitter<void>();
  @Output('onUpdate') onUpdate = new EventEmitter<OnUpdateTicketModel>();
  @ViewChild('motivo') motivo:any;


  localeCalendar = CALENDAR_LANG_ES;
  esFechaRequerida = false;
  esMotivoRequerido = false;
  
  today = new Date();
  ticket!: Ticket;
  estados = signal<Estado[]>([]);
  isMobile = isMobile();
  cambioFechaCompromiso = false;

  ngOnInit(): void {
    this.ticket = { ...this.ticketParam };
    if (this.ticket.fecha_respuesta != null  && !(this.ticket.fecha_respuesta instanceof Date)) {            
        const [year, month, day] = (this.ticket.fecha_respuesta as string).split('-').map(Number);
        this.ticket.fecha_respuesta = new Date(year, month - 1, day);
      }            
    this.setEstados();
  }


  onDateChange(event: any) {    
    this.ticket.fecha_respuesta = event;
    this.cambioFechaCompromiso = true;
  }

  private setEstados() {
    this.estados.set(this.catalogoEstados);

  }

  actualizar() {
    this.esFechaRequerida = false;
    this.esMotivoRequerido = false;
    const estadoValidosConFecha = [3, 12, 9];
    const estadosNecesitanMotivo = [11];
    if (estadosNecesitanMotivo.includes(+this.ticket.id_estado) && this.motivo.nativeElement.value.trim() == "") {
      this.esMotivoRequerido = true
      return;
    }
    if (estadoValidosConFecha.includes(+this.ticket.id_estado)
      && this.ticket.fecha_respuesta == null) {
      this.esFechaRequerida = true
      return;
    }
    const motivoRef = this.motivo;    
    this.onUpdate.emit({
      ticket: this.ticket,
      cambioFechaCompromiso: this.cambioFechaCompromiso,
      motivo:motivoRef==undefined?'':motivoRef.nativeElement.value.trim()
    });
  }


}
