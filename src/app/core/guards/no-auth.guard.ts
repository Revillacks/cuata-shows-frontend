// src/app/core/guards/noAuth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Permite el acceso solo si el usuario NO está autenticado.
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      // Si el usuario está autenticado, redirige al dashboard u otra ruta segura.
      return this.router.parseUrl('/app/dashboard');
    }
  }
}
