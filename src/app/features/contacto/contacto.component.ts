import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactoComponent {
  /** se declara sin valor inicial */
  contactForm!: ReturnType<FormBuilder['group']>;
  sending = false;
  success = false;
  error   = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    /* aquí ya existe this.fb */
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      comentarios: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      console.warn('Formulario inválido:', this.contactForm.value);
      return;
    }

    this.sending = true;
    this.http
      .post('http://localhost:3000/contact', this.contactForm.value)
      .subscribe({
        next: () => {
          this.success = true;
          this.contactForm.reset();
        },
        error: () => (this.error = true),
      })
      .add(() => (this.sending = false));
  }
}
