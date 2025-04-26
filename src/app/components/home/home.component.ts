import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../interfaces/tarea';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  // tareas: Tarea[] = [];
  // errorMessage: string = '';
  // tareaAEditar: Tarea | null = null;

  // constructor(private tareaService: TareaService) { }

  // ngOnInit(): void {
  //   this.cargarTareas();
  // }

  // cargarTareas(): void {
  //   this.tareaService.obtenerTareas().subscribe({
  //     next: (tareas) => {
  //       this.tareas = tareas;
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Error al cargar las tareas: ' + error.message;
  //       console.error(this.errorMessage);
  //     }
  //   });
  // }

  // eliminarTarea(id: any) {
  //   this.tareaService.eliminarTarea(id).subscribe({
  //     next: () => {
  //       this.cargarTareas();
  //     },
  //     error: (error) => {
  //       console.error('Error al eliminar la tarea:', error);
  //     }
  //   });
  // }

  // iniciarEdicion(tarea: Tarea) {
  //   this.tareaAEditar = { ...tarea }; // Crea una copia para no modificar la lista directamente
  // }

  // cancelarEdicion(): void {
  //   this.tareaAEditar = null;
  // }

  // guardarEdicion() {
  //   if (this.tareaAEditar && this.tareaAEditar._id) {
  //     this.tareaService.actualizarTarea(this.tareaAEditar._id, this.tareaAEditar).subscribe({
  //       next: (tareaActualizada) => {
  //         console.log('Tarea actualizada:', tareaActualizada);
  //         this.cargarTareas(); // Recargar la lista
  //         this.tareaAEditar = null; // Ocultar el formulario
  //       },
  //       error: (error) => {
  //         console.error('Error al actualizar la tarea:', error);
  //       }
  //     });
  //   }
  // }
}
