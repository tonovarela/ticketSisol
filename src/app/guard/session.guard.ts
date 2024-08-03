import { inject } from "@angular/core";

import { UsuarioService } from "@services/usuario.service";

export const sessionGuard = () => {       
    const stateAuth = inject(UsuarioService).StateAuth();    
    return stateAuth.statusLogin=="LOGGED";
}