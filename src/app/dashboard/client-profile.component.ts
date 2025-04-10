import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface Token { sub: number; username: string; role: string; }

@Component({
  standalone: true,
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  imports: [CommonModule],
})
export class ClientProfileComponent {
  user = (() => {
    const token = localStorage.getItem('access_token');
    return token ? jwtDecode<Token>(token) : null;
  })();
}
