
import {  Component, computed, inject } from '@angular/core';
import { UiService } from '@services/ui.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-header',  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',  
})
export class HeaderComponent {

  public uiService = inject(UiService);
  usuarioService= inject(UsuarioService);

  usuario = computed(()=>{            
    return this.usuarioService.StateAuth().usuario  || {name:'',photoURL:'',id:'',username:'',email:''};
  });
  

 }
