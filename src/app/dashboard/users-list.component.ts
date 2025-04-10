import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, User } from './admin-api.service';

@Component({
  standalone: true,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class UsersListComponent implements OnInit {
  users = signal<User[]>([]);
  form  = signal<Partial<User>>({ username: '', email: '', role: 'client' });

  dlg!: HTMLDialogElement;
  editId: number | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }
  load() { this.api.listUsers().subscribe(u => this.users.set(u)); }

  /* ─── Alta ───────────────────────── */
  openCreate(dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = null;
    this.form.set({ username: '', email: '', role: 'client' });
    dlg.showModal();
  }

  /* ─── Edición ────────────────────── */
  openEdit(u: User, dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = u.id!;
    this.form.set({ ...u });
    dlg.showModal();
  }

  /* ─── Guardar ────────────────────── */
  save() {
    const dto = this.form();
    const req$ = this.editId
      ? this.api.updateUser(this.editId, dto)
      : this.api.createUser(dto);
    req$.subscribe(() => { this.dlg.close(); this.load(); });
  }

  /* ─── Eliminar ───────────────────── */
  remove(id: number) {
    if (confirm('¿Eliminar usuario?')) {
      this.api.deleteUser(id).subscribe(() => this.load());
    }
  }
}
