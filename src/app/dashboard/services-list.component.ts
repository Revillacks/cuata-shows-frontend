import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Service } from './admin-api.service';

@Component({
  standalone: true,
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ServicesListComponent implements OnInit {
  services = signal<Service[]>([]);

  // ▶ usamos Partial<Service> porque durante el alta no tenemos todos los campos
  form = signal<Partial<Service>>({ title: '', description: '' });

  dlg!: HTMLDialogElement;
  /** tiene que ser público o protected para usarlo en la plantilla */
  editId: number | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.api.listServices().subscribe(d => this.services.set(d));
  }

  /* ───────── alta ───────── */
  openCreate(dlg: HTMLDialogElement) {
    this.dlg = dlg;
    this.editId = null;
    this.form.set({ title: '', description: '' });
    dlg.showModal();
  }

  /* ───────── edición ────── */
  openEdit(s: Service, dlg: HTMLDialogElement) {
    this.dlg = dlg;
    this.editId = s.id!;
    this.form.set({ ...s });   // copia completa
    dlg.showModal();
  }

  /* ───────── guardar ────── */
  save() {
    const dto = this.form();
    const req$ = this.editId
      ? this.api.updateService(this.editId, dto)
      : this.api.createService(dto);
    req$.subscribe(() => {
      this.dlg.close();
      this.load();
    });
  }

  remove(id: number) {
    if (confirm('¿Eliminar servicio?')) {
      this.api.deleteService(id).subscribe(() => this.load());
    }
  }
}
