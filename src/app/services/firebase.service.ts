import { Injectable } from '@angular/core';
import { TypeAuth } from '@interfaces/usuario.interface';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,OAuthProvider  } from "firebase/auth";
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})

export class FireService {
  firebaseConfig = environment.googleEnvironment;
  app = initializeApp(this.firebaseConfig);
  auth = getAuth(this.app);
  

  async iniciarLogin(tipoAuth:TypeAuth): Promise<string | null> {    
    let provider =undefined;
    if (tipoAuth === 'GOOGLE') {
      provider = new GoogleAuthProvider();
    }
    if (tipoAuth === 'MICROSOFT') {
      provider = new OAuthProvider('microsoft.com');
    }
    if (provider === undefined) {
      return null;
    }
    try {
      const response = await signInWithPopup(this.auth, provider)      
      return response.user.getIdToken();      
    }
    catch (e) {
      return null
    }



   








  }




 





}
