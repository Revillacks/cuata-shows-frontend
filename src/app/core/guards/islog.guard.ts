import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class IslogGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Verifica que el token no haya expirado, si es que tu token tiene 'exp' (fecha de expiración)
        const isExpired = decoded.exp && decoded.exp < Date.now() / 1000;

        if (!isExpired) {
          console.log('Token válido:', decoded);
          return true;
        } else {
          console.warn('Token expirado.');
        }

      } catch (error) {
        console.error('Error decodificando token:', error);
      }
    }

    // Si algo falla arriba, redirige claramente al login:
    return this.router.parseUrl('/auth/login');
  }
}
