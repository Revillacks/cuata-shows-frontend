import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesDataService {
  // Define la URL base para la API
  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de servicios
  getServices(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.apiUrl);
  }
}
