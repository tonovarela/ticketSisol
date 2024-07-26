import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeModule } from '@lib/prime.module';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Estado, OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { isMobile } from '../../../utils/mobileDetector';
import { CALENDAR_LANG_ES } from 'src/app/conf/locale';


@Component({
  standalone: true,
  imports: [CommonModule, PrimeModule,FormsModule],
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',

})
export class DetalleComponent implements OnInit {
  localeCalendar= CALENDAR_LANG_ES;
  esFechaRequerida = false;
  today=new Date();
  ticket!:Ticket;
  estados= signal<Estado[]>([]);
  isMobile = isMobile();
  cambioFechaCompromiso = false;
  ngOnInit(): void {    
    this.ticket = {...this.ticketParam};        
    this.setEstados(this.ticket.fecha_respuesta!=undefined);    
  }
  @Input('catalogoEstados') catalogoEstados: Estado[] = [];
  @Input('ticket') ticketParam!: Ticket;
  @Output('onClose') onClose = new EventEmitter<void>();
  @Output('onUpdate') onUpdate = new EventEmitter<OnUpdateTicketModel>();

  onDateChange(event:any) {            
    let cambioFechaCompromiso = this.ticket.fecha_respuesta!=undefined && event!=undefined;
    this.cambioFechaCompromiso = cambioFechaCompromiso;    
    this.ticket.fecha_respuesta = event;  
    this.setEstados(true);    
  }
  
  private setEstados(tieneFecha:boolean=false){
      if (!tieneFecha && this.ticket.id_estado!=3){      
        this.ticket.id_estado=1;
        this.estados.set(this.catalogoEstados.filter(e=>e.id_estado==3 || e.id_estado==1));
      }else{
        this.estados.set(this.catalogoEstados);
      }                
  }
  
  onKey(key:Event){
    this.ticket!.fecha_respuesta = undefined;    
  }
  actualizar() {    
    this.esFechaRequerida=false;
        if(this.ticket.id_estado!=3 && this.ticket.fecha_respuesta==undefined){
            this.esFechaRequerida=true
          return;            
        }
    this.onUpdate.emit({ticket:this.ticket,cambioFechaCompromiso:this.cambioFechaCompromiso});
  }
  

}
