
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeAuth } from '@interfaces/usuario.interface';
import { FireService } from '@services/firebase.service';
import { UiService } from '@services/ui.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder)

  ngOnInit() {
    this.uiService.setMenuStatus(false);

  }  
  loginForm = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', Validators.required]

  });
  usuarioService = inject(UsuarioService);
  firebaseService = inject(FireService)
  private uiService = inject(UiService);



  campoValido(nombreCampo: string) {
    if (this.loginForm.get(nombreCampo) == null) {
      return false;
    }
    return this.loginForm.get(nombreCampo)!.invalid
      && this.loginForm.get(nombreCampo)!.touched
  }

  async login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const usuario = this.loginForm.get('usuario')!.value;
    const password = this.loginForm.get('password')!.value;
    await this.usuarioService.login(usuario!, password!);

  }

  async loginWitFireBaseAutentication(typeAuth: TypeAuth) {
    const tokenAutentication = await this.firebaseService.iniciarLogin(typeAuth);

    if (tokenAutentication == null) {
      return;
    }
    await this.usuarioService.checkToken(tokenAutentication);

  }


}
