import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { LayoutComponent } from './layout/layout.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';


const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    { path: 'listado', component: ListadoComponent },     
    { path: 'nuevo', component: NuevoComponent },
  ]
},
{ path: 'bitacora/:id_ticket', component: BitacoraComponent },

{path: '', redirectTo: 'listado', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }