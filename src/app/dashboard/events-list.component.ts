import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Event} from './admin-api.service';
     // ajusta ruta si es distinto

@Component({
  standalone: true,
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class EventsListComponent implements OnInit {
  events = signal<Event[]>([]);
  form   = signal<Partial<Event>>({ title: '', description: '' });

  dlg!: HTMLDialogElement;
  editId: number | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }
  load() { this.api.listEvents().subscribe(d => this.events.set(d)); }

  openCreate(dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = null;
    this.form.set({ title: '', description: '' });
    dlg.showModal();
  }

  openEdit(e: Event, dlg: HTMLDialogElement) {
    this.dlg = dlg; this.editId = e.id!;
    this.form.set({ ...e });
    dlg.showModal();
  }

  save() {
    const dto = this.form();
    const req$ = this.editId
      ? this.api.updateEvent(this.editId, dto)
      : this.api.createEvent(dto);
    req$.subscribe(() => { this.dlg.close(); this.load(); });
  }

  remove(id: number) {
    if (confirm('¿Eliminar evento?')) {
      this.api.deleteEvent(id).subscribe(() => this.load());
    }
  }
}
