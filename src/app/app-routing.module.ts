import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'tickets',
  loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
},{
  path: '**',redirectTo:'tickets'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
