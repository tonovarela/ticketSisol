import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TicketsRoutingModule } from './tickets-routing.module';
import { PrimeModule } from '../lib/prime.module';
import { LayoutComponent } from './layout/layout.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';
import { CameraComponent } from '../icons/camera/camera.component';
import { AttachmentComponent } from '../icons/attachment/attachment.component';
import { MessagesComponent } from '../icons/messages/messages.component';
import { DetalleComponent } from './components/detalle/detalle.component';




@NgModule({
  declarations: [    
    BitacoraComponent,
    LayoutComponent,
    ListadoComponent,
    NuevoComponent,

  ],
  imports: [    
    CommonModule,    
    MensajeComponent,    
    DetalleComponent,    
    CameraComponent,
    MessagesComponent,
    AttachmentComponent,
    FormsModule,
    ReactiveFormsModule,
    TicketsRoutingModule,
    SharedModule,
    PrimeModule
  ]
})
export class TicketsModule { }
