
import {  Component, inject, type OnInit } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-sidebar',  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  
})
export class SidebarComponent implements OnInit {
  private usuarioService= inject(UsuarioService);

  ngOnInit(): void { }
  cerrarSesion() {
    this.usuarioService.closeSession();
  }

}
