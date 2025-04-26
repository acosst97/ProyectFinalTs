import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private loginUrl = 'http://localhost:3000/api/usuarios/log';
  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
  
  loginUsuario(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  obtenerUsuario() : Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
  }


}
