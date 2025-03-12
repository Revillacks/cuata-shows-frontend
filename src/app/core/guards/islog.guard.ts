import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IslogGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // El usuario está logueado, puede pasar
      return true;
    } else {
      // No está logueado, redirige a /auth o /login
      return this.router.parseUrl('/auth/login');
    }
  }
  
}
