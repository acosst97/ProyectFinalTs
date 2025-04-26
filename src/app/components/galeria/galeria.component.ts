import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Cancion } from '../../interfaces/tarea';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {
  canciones: Cancion[] = [];
  filtroForm: FormGroup; 
  tareaForm: FormGroup; 
  editando: boolean = false;
  tareaEditandoId: string | null = null;
  archivoSeleccionado: File | null = null;
  abriModal = { showModal: false };
  categorias: string[] = ['pop', 'rock', 'latin', 'electronica'];
  modalImageUrl: string = '';
  modalTitle: string = '';
  modalDescription: string = '';

  @ViewChild('modalEnviado') modalEnviado!: ElementRef;

  constructor(
    private tareaService: TareaService,
    private fb: FormBuilder
  ) {
    this.filtroForm = this.fb.group({ 
      searchTerm: [''],
      categoriaSeleccionada: ['']
    });

    this.tareaForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      prioridad: ['media'],
      fechaVencimiento: ['']
    });
  }

  openForm() {
    this.abriModal.showModal = true;
  }

  ngOnInit(): void {
    this.cargarCanciones();

 
    this.filtroForm.valueChanges.subscribe(() => {
      this.cancionesFiltradas = this.filtrarCanciones();
    });
  }

  cargarCanciones(): void {
    this.tareaService.obtenerTareas().subscribe(data => {
      this.canciones = data;
      this.cancionesFiltradas = this.filtrarCanciones(); 
      console.log("canciones", this.canciones);
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
          this.cargarCanciones();
        });
    } else {
      this.tareaService.crearTarea(formData, this.archivoSeleccionado).subscribe(() => {
        this.resetFormulario();
        this.cargarCanciones();
      });
    }
  }

  editarTarea(cancion: Cancion): void {
    this.tareaForm.patchValue({
      titulo: cancion.titulo,
      descripcion: cancion.descripcion,
      // ... otros campos si los tienes
    });
    this.editando = true;
    this.tareaEditandoId = cancion._id!;
  }

  eliminarTarea(id: string): void {
    if (confirm("¿Estás seguro de eliminar esta canción?")) {
      this.tareaService.eliminarTarea(id).subscribe(() => {
        this.cargarCanciones();
      });
    }
  }

  resetFormulario(): void {
    this.tareaForm.reset({ prioridad: 'media' });
    this.editando = false;
    this.tareaEditandoId = null;
    this.archivoSeleccionado = null;
  }

  cancionesFiltradas: Cancion[] = []; 

  filtrarCanciones(): Cancion[] {
    const searchTerm = this.filtroForm.get('searchTerm')?.value?.toLowerCase() || '';
    const categoriaSeleccionada = this.filtroForm.get('categoriaSeleccionada')?.value?.toLowerCase() || '';

    return this.canciones.filter(cancion => {
      const tituloCoincide = cancion.titulo.toLowerCase().includes(searchTerm);
      const categoriaCoincide = !categoriaSeleccionada || (cancion.categoria && cancion.categoria.toLowerCase() === categoriaSeleccionada);
      return tituloCoincide && categoriaCoincide;
    });
  }

  mostrarModal(cancion: Cancion): void {
    this.modalImageUrl = `http://localhost:3000/${cancion.imagen}`;
    this.modalTitle = cancion.titulo;
    this.modalDescription = cancion.descripcion || 'No hay descripción disponible.';
    this.modalEnviado.nativeElement.classList.remove('hidden');
  }
 
}
