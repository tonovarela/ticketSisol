
import {  Component, inject, OnInit } from '@angular/core';
import {  OnUpdateTicketModel, Ticket } from '@interfaces/ticket.interface';
import { FireService } from '@services/firebase.service';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',  
})
export class ListadoComponent implements OnInit {  
  firebaseService= inject(FireService);
  usuarioService = inject(UsuarioService)
  ngOnInit(): void {    
    
  } 

  
  first = 0;
  rows = 10;    
  ticketDetalle:Ticket| undefined;
  ticketService = inject(TicketService);

  estados = this.ticketService.estados;  
//   async loginWithGoogleAutentication(){
//     try {
//       const tokenAutentication= await this.firebaseService.iniciarLogin();      
//       if(tokenAutentication ==null ){        
//         return;
//       }

//       //this.usuarioService.usuario = user;
// //      console.log(this.usuarioService.usuario);

//     }catch(e){
//       console.error(e);
//     }
    
//   }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  
  isLastPage(): boolean {
    return this.ticketService.Tickets() ? this.first === (this.ticketService.Tickets().length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.ticketService.Tickets() ? this.first === 0 : true;
  }


  verDetalle(ticket:Ticket){
    //this.verDetalleTicket = true;    
    this.ticketDetalle=ticket
  }

  actualizarTicket({ticket,cambioFechaCompromiso}:OnUpdateTicketModel){   
    this.ticketService.actualizar(ticket);
    this.ticketDetalle = undefined;
  }
  cerrarDetalle(){    
    this.ticketDetalle=undefined;
  }

}
