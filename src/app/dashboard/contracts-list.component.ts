import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Contract, Service, User } from './admin-api.service';

@Component({
  standalone: true,
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ContractsListComponent implements OnInit {
  contracts = signal<Contract[]>([]);
  users     = signal<User[]>([]);
  services  = signal<Service[]>([]);

  form  = signal<Partial<Contract>>({ user_id: 0, service_id: 0, status: 'active' });

  dlg!: HTMLDialogElement;
  editId: number | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    // cargamos todo en paralelo
    this.load();
    this.api.listUsers().subscribe(u => this.users.set(u));
    this.api.listServices().subscribe(s => this.services.set(s));
  }

  load() {
    this.api.listContracts().subscribe(c => this.contracts.set(c));
  }

  /* ─── Alta ────────────── */
  openCreate(dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = null;
    const firstUser = this.users()[0]?.id ?? 0;
    const firstServ = this.services()[0]?.id ?? 0;
    this.form.set({ user_id: firstUser, service_id: firstServ, status: 'active' });
    dlg.showModal();
  }

  /* ─── Edición ─────────── */
  openEdit(c: Contract, dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = c.id!;
    this.form.set({ ...c });
    dlg.showModal();
  }

  /* ─── Guardar ─────────── */
  save() {
    const dto = this.form();
    const req$ = this.editId
      ? this.api.updateContract(this.editId, dto)
      : this.api.createContract(dto);
    req$.subscribe(() => { this.dlg.close(); this.load(); });
  }

  /* ─── Eliminar ────────── */
  remove(id: number) {
    if (confirm('¿Eliminar contratación?')) {
      this.api.deleteContract(id).subscribe(() => this.load());
    }
  }

  /* helpers para mostrar nombres en la tabla */
  userName(id: number)    { return this.users().find(u => u.id === id)?.username ?? id; }
  serviceTitle(id: number){ return this.services().find(s => s.id === id)?.title ?? id; }
}
