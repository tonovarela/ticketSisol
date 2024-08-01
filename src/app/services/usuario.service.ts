import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ResponseCheckToken, StateAuth, StatusLogin} from '@interfaces/usuario.interface';
import { delay, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly labelToken = "tokenSISOL";
  private readonly URL_AUTH_SERVICE = environment.urlAuthService;
  private http = inject(HttpClient);
  private stateAuth = signal<StateAuth>({ statusLogin: StatusLogin.NOT_LOGGED, usuario: null });


  StateAuth = computed(() => {
    return this.stateAuth();
  })

  isLoadingUser = computed(() => {
    return this.stateAuth().statusLogin === 'LOGGING';
  });

  async checkToken(token: string): Promise<void> {
    this.stateAuth.set({ statusLogin: StatusLogin.LOGGING, usuario: null });
    try {
      const { usuario, token: newToken } = await firstValueFrom(
        this.http.get<ResponseCheckToken>(`${this.URL_AUTH_SERVICE}/auth/checkToken`,
          { headers: { 'Authorization': `Bearer ${token}` } })
      );
      this.stateAuth.set({ statusLogin: StatusLogin.LOGGED, usuario });      
      localStorage.setItem(this.labelToken, newToken);
      
    } catch (exception: any) {     
      this.stateAuth.set({ statusLogin: StatusLogin.ERROR, usuario: null, mensaje: exception.error['error'] });
    }
  }

  async login(login: string, password: string) {
    try {
      const resp = await firstValueFrom(this.http.post<{ token: string }>(`${this.URL_AUTH_SERVICE}/auth/login`, { login, password }));
      await this.checkToken(resp.token);
    } catch (exception: any) {     
      this.stateAuth.set({ statusLogin: StatusLogin.ERROR, usuario: null, mensaje: exception.error['error'] });

    }


  }



  async verifyLocalStorage() {
    const token = localStorage.getItem(this.labelToken);
    if (token) {
      await this.checkToken(token);
    }
  }

  clearStorage() {
    localStorage.removeItem(this.labelToken);
  }




  closeSession() {
    this.clearStorage();
    this.stateAuth.set({ statusLogin: StatusLogin.NOT_LOGGED, usuario: null });
  }


}
