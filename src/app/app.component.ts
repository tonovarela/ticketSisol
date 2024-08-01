import { Component, effect, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.usuarioService.verifyLocalStorage();
  }
  isLoadingUser = this.usuarioService.isLoadingUser
  constructor() {
    effect(() => {
      const { statusLogin } = this.usuarioService.StateAuth();      
      switch (statusLogin) {
        case 'LOGGED':
          this.router.navigate(['/tickets/']);
          break;
        case 'NOT_LOGGED':
          this.router.navigate(['/auth/login']);
          break;
        case 'ERROR':
          const { mensaje } = this.usuarioService.StateAuth();                    
          this.messageService.add({ severity: 'error', summary: 'Login', detail: mensaje });
          this.usuarioService.clearStorage();
          this.router.navigate(['/auth/login']);
          break;
      }
    });
  }









}
