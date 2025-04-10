import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }


  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
}
