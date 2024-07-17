import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { LayoutComponent } from './layout/layout.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';


const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    { path: 'listado', component: ListadoComponent },      
    
    // { path: '**', redirectTo: 'listado' }
  ]
},
{ path: 'nuevo', component:  NuevoComponent},    


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
