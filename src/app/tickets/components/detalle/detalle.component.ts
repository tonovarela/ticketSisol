import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeModule } from '../../../lib/prime.module';
import { Estado, Ticket } from '../../../interfaces/ticket.interface';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, PrimeModule,FormsModule],
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',

})
export class DetalleComponent implements OnInit {
  today=new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    console.log(this.ticket);
  }
  @Input('catalogoEstados') estados: Estado[] = [];
  @Input('ticket') ticket!: Ticket;
  @Output('onClose') onClose = new EventEmitter<void>();
  @Output('onUpdate') onUpdate = new EventEmitter<Ticket>();
  

  constructor() {
    console.log(this.today);
  }
  onKey(key:Event){
    this.ticket.fecha_respuesta = undefined;
    console.log("key pressed");
  }

}
