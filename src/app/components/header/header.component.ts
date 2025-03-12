import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;
  
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }


  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
}
