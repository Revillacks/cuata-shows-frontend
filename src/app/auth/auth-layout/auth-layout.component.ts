import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

// Estrategia personalizada que impide reutilizar la ruta
@Injectable()
export class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {}

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./auth-layout.component.scss'],
  imports: [CommonModule, RouterOutlet],
  providers: [{ provide: RouteReuseStrategy, useClass: NoReuseStrategy }]
})
export class AuthLayoutComponent implements OnInit {
  ngOnInit(): void {
    console.log('AuthLayoutComponent initialized.');
  }
}
