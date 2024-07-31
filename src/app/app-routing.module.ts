import {  NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthSessionGuard } from './guard/authSession.guard';
import { sessionGuard } from './guard/session.guard';




const routes: Routes = [{
  path: 'tickets', canActivateChild: [sessionGuard], loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule),
},
{
  path: 'auth', canActivate: [AuthSessionGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
},
{ path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
