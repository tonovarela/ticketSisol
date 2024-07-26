import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: { displayName?: string | null; email?: string | null; photoURL: string | null;username?:string  } = { displayName: null, email: null, photoURL: null,username:undefined };  
  constructor() { }
}
