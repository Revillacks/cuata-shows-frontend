// src/app/dashboard/admin-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

/* ──────── Modelos ──────── */
export interface Service {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  price?: number;
}

export interface Event {
  id?: number;
  title: string;
  description: string;
  event_date?: string;   // ISO string o Date
  image_url?: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  role: 'admin' | 'client';
  created_at?: string;
}

export interface Contract {
  id?: number;
  user_id: number;
  service_id: number;
  contracted_at?: string;
  status?: string;
}

/* ──────── Servicio API ──────── */
@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private http = inject(HttpClient);
  private api  = 'http://localhost:3000';

  /* helpers genéricos */
  get<T>(u: string): Observable<T>           { return this.http.get<T>(this.api + u); }
  post<T>(u: string, b: any)                 { return this.http.post<T>(this.api + u, b); }
  patch<T>(u: string, b: any)                { return this.http.patch<T>(this.api + u, b); }
  delete<T>(u: string)                       { return this.http.delete<T>(this.api + u); }

  /* quick‑stats (si no tienes /stats en el backend) */
  stats() {
    return forkJoin({
      services:  this.get<Service[]>('/services'),
      events:    this.get<Event[]>('/events'),
      users:     this.get<User[]>('/users'),
      contracts: this.get<Contract[]>('/user-services'),
    });
  }

  /* ─── Servicios ───────────────────────── */
  listServices():  Observable<Service[]>          { return this.get<Service[]>('/services'); }
  createService(b: Partial<Service>)              { return this.post<Service>('/services', b); }
  updateService(id: number, b: Partial<Service>)  { return this.patch<Service>(`/services/${id}`, b); }
  deleteService(id: number)                       { return this.delete(`/services/${id}`); }

  /* ─── Eventos ──────────────────────────── */
  listEvents():   Observable<Event[]>             { return this.get<Event[]>('/events'); }
  createEvent(b: Partial<Event>)                  { return this.post<Event>('/events', b); }
  updateEvent(id: number, b: Partial<Event>)      { return this.patch<Event>(`/events/${id}`, b); }
  deleteEvent(id: number)                         { return this.delete(`/events/${id}`); }

  /* ─── Usuarios ─────────────────────────── */
  listUsers():  Observable<User[]>                { return this.get<User[]>('/users'); }
  // Si más adelante permites alta/edición desde el dashboard:
  createUser(b: Partial<User>)                    { return this.post<User>('/users', b); }
  updateUser(id: number, b: Partial<User>)        { return this.patch<User>(`/users/${id}`, b); }
  deleteUser(id: number)                          { return this.delete(`/users/${id}`); }

  /* ─── Contrataciones ───────────────────── */
  listContracts(): Observable<Contract[]>         { return this.get<Contract[]>('/user-services'); }
  createContract(b: Partial<Contract>)            { return this.post<Contract>('/user-services', b); }
  updateContract(id: number, b: Partial<Contract>){ return this.patch<Contract>(`/user-services/${id}`, b); }
  deleteContract(id: number)                      { return this.delete(`/user-services/${id}`); }
}
