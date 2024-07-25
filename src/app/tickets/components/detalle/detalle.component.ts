import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeModule } from '@lib/prime.module';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Estado, OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';


@Component({
  standalone: true,
  imports: [CommonModule, PrimeModule,FormsModule],
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',

})
export class DetalleComponent implements OnInit {
  today=new Date().toISOString().split('T')[0];
  ticket!:Ticket;
  estados= signal<Estado[]>([]);
  cambioFechaCompromiso = false;
  ngOnInit(): void {    
    this.ticket = {...this.ticketParam};    
    this.setEstados(this.ticket.fecha_respuesta!=undefined);    
  }
  @Input('catalogoEstados') catalogoEstados: Estado[] = [];
  @Input('ticket') ticketParam!: Ticket;
  @Output('onClose') onClose = new EventEmitter<void>();
  @Output('onUpdate') onUpdate = new EventEmitter<OnUpdateTicketModel>();

  onDateChange(event:string) {    
    let cambioFechaCompromiso = this.ticket.fecha_respuesta!=undefined && event.length>0;
    this.cambioFechaCompromiso = cambioFechaCompromiso;    
    this.setEstados(event.length>0);    
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
    this.onUpdate.emit({ticket:this.ticket,cambioFechaCompromiso:this.cambioFechaCompromiso});
  }
  

}
