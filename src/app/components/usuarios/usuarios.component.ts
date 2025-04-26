import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
 
  usuarios:Usuario[] =[];
  usuarioSrv= inject(UsuarioService)
  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuarioSrv.obtenerUsuario().subscribe(data => {
      this.usuarios = data;
      console.log("usuarios",this.usuarios);
      
    });
  }
}
