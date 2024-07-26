import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class FireService {

   firebaseConfig = {
    apiKey: "AIzaSyAgRllSioGe9dTubfYl3HJQHdb3qkit-ao",
    authDomain: "login-aae3a.firebaseapp.com",
    projectId: "login-aae3a",
    storageBucket: "login-aae3a.appspot.com",
    messagingSenderId: "1060595366469",
    appId: "1:1060595366469:web:ecb85034079df598c4c12c"
  };
   app = initializeApp(this.firebaseConfig);


   async iniciarLogin(){
    
    const provider = new GoogleAuthProvider();
     const auth = getAuth(this.app);

     try {
      const {user}=await signInWithPopup(auth, provider)
      const {displayName, email, photoURL} = user;    
      return {displayName, email, photoURL};
      
     }catch(e){
       console.error(e);
       return null
     }
    
    

    
    // return auth;
   }


}
