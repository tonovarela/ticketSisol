
import {  Component, computed, inject, type OnInit } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-sidebar',  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  
})
export class SidebarComponent implements OnInit {
  private usuarioService= inject(UsuarioService);

  username = computed(() => { 
    const user= this.usuarioService.StateAuth().usuario?.username || '';
    return user.length > 10 ? user.substring(0, 10) + '...' : user;
  });

  ngOnInit(): void { }
  cerrarSesion() {
    this.usuarioService.closeSession();
  }

}
