import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:3000/api/tareas'; 

  constructor(private http: HttpClient) { }
  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  obtenerTareaPorId(id: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  crearTarea(tarea: Partial<Tarea>, archivo?: File): Observable<Tarea> {
    const formData = new FormData();
    formData.append('titulo', tarea.titulo || '');
    formData.append('descripcion', tarea.descripcion || '');
    formData.append('prioridad', tarea.prioridad || 'media');
    if (tarea.fechaVencimiento) {
      formData.append('fechaVencimiento', tarea.fechaVencimiento.toString());
    }
    if (archivo) {
      formData.append('archivo', archivo, archivo.name);
    }

    return this.http.post<Tarea>(this.apiUrl, formData);
  }

  actualizarTarea(id: string, tarea: Partial<any>, archivo?: File): Observable<Tarea> {
    const formData = new FormData();
    for (let key in tarea) {
      if (tarea[key] !== undefined) {
        formData.append(key, (tarea as any)[key]);
      }
    }

    if (archivo) {
      formData.append('archivo', archivo);
    }

    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarTarea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
