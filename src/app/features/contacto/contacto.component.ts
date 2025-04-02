import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      comentarios: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Datos del formulario:', this.contactForm.value);
      // Aquí puedes enviar el formulario (por ejemplo, a un API)
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
