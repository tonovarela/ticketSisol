import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'tickets',loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule), },
  {path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),},
  {path: '**',redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
