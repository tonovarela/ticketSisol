import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private menuStatus = false;

  constructor() { }


  toggleMenu() {
    this.menuStatus = !this.menuStatus;
  }

  IsOpenMenu() {
    return this.menuStatus === true;
  } 

  setMenuStatus(status: boolean) {
    this.menuStatus = status;
  }
}
