import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { PrimeModule } from '../lib/prime.module';
import { LayoutComponent } from './layout/layout.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';



@NgModule({
  declarations: [
    MensajeComponent,
    LayoutComponent,
    ListadoComponent,
    NuevoComponent
  ],
  imports: [    
    CommonModule,
    FormsModule,
    TicketsRoutingModule,
    SharedModule,
    PrimeModule
  ]
})
export class TicketsModule { }
