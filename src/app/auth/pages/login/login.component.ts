
import { Component, inject, OnInit } from '@angular/core';
import { TypeAuth } from '@interfaces/usuario.interface';
import { FireService } from '@services/firebase.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
 ngOnInit() {
   
  }
   loginForm =  {usuario:'',password:''};
   usuarioService =inject(UsuarioService);
   firebaseService = inject(FireService)
   

  async login(){      
    await this.usuarioService.login(this.loginForm.usuario,this.loginForm.password);    
        
   }

   async loginWitFireBaseAutentication(typeAuth:TypeAuth){        
    const tokenAutentication=  await this.firebaseService.iniciarLogin(typeAuth);
        
      if (tokenAutentication == null) {
        return;
      }
    await this.usuarioService.checkToken(tokenAutentication);                
      
  }


 }
