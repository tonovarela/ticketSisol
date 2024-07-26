import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: { displayName?: string | null; email?: string | null; photoURL: string | null; } = { displayName: 'Marco Antonio', email: 'mestelles@litoprocess.com', photoURL: 'https://www.github.com/shadcn.png' } ;
  constructor() { }
}
