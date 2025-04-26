import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tarea } from '../../interfaces/tarea';
import { TareaService } from '../../services/tarea.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss'
})
export class TareasComponent {

  @ViewChild("AbriModal") abriModal : any;
  tareas: Tarea[] = [];
  tareaForm: FormGroup;
  editando: boolean = false;
  tareaEditandoId: string | null = null;  
  archivoSeleccionado: File | null = null;

  constructor(
    private tareaService: TareaService,
    private fb: FormBuilder
  ) {
    this.tareaForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      prioridad: ['media'],
      fechaVencimiento: ['']
    });
  }
 
  openForm(){
    this.abriModal.showModal = true;
  }
  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.obtenerTareas().subscribe(data => {
      this.tareas = data;
      console.log("tareas",this.tareas);
      
    });
  }

  onArchivoSeleccionado(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  guardarTarea(): void {
    const formData = this.tareaForm.value;

    if (this.editando && this.tareaEditandoId) {
      this.tareaService.actualizarTarea(this.tareaEditandoId, formData, this.archivoSeleccionado)
        .subscribe(() => {
          this.resetFormulario();
          this.cargarTareas();
        });
    } else {
      this.tareaService.crearTarea(formData, this.archivoSeleccionado).subscribe(() => {
        this.resetFormulario();
        this.cargarTareas();
      });
    }
  }

  editarTarea(tarea: Tarea): void {
    this.tareaForm.patchValue(tarea);
    this.editando = true;
    this.tareaEditandoId = tarea._id!;
  }

  eliminarTarea(id: string): void {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      this.tareaService.eliminarTarea(id).subscribe(() => {
        this.cargarTareas();
      });
    }
  }

  resetFormulario(): void {
    this.tareaForm.reset({ prioridad: 'media' });
    this.editando = false;
    this.tareaEditandoId = null;
    this.archivoSeleccionado = null;
  }
}
