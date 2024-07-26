
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from '@services/firebase.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm =  {usuario:'mestelles',password:'123456'};
   usuarioService =inject(UsuarioService);
   firebaseService = inject(FireService)
   router = inject(Router);

   login(){
    this.usuarioService.usuario.displayName="Litoapps User";
    this.usuarioService.usuario.email="user@litoprocess.com";
    this.usuarioService.usuario.username="mestelles";
    this.usuarioService.usuario.photoURL="https://github.com/shadcn.png";
    this.router.navigate(['/tickets']);
    
   }

   async loginWithGoogleAutentication(){
    try {
      const user= await this.firebaseService.iniciarLogin();      
      if(user ){        
        this.usuarioService.usuario = user;
        this.router.navigate(['/tickets']);        
      }
    }catch(e){
      console.error(e);
    }
    
  }


 }
