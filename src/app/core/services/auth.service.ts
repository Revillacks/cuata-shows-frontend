import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  login(): void{
    this.loggedIn = true;
  }
  logout(): void{
    this.loggedIn = false;
  }

}
