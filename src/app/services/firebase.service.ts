import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class FireService {

   firebaseConfig = environment.googleEnvironment;
   app = initializeApp(this.firebaseConfig);


   async iniciarLogin(){
    
    const provider = new GoogleAuthProvider();
     const auth = getAuth(this.app);

     try {
      const {user}=await signInWithPopup(auth, provider)
      const {displayName, email, photoURL} = user;    
      return {displayName, email, photoURL,username:email?.split("@")[0]};
      
     }catch(e){
       console.error(e);
       return null
     }
    
    

    
    // return auth;
   }


}
