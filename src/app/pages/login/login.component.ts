import { RESPONSE } from './../../../../backend/node_modules/mongodb/src/constants';
import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userLogin } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ModalComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
@ViewChild("AbriModal") abriModal : any;
private userSrv = inject(UsuarioService); 
registroForm: any = {}; 
loginForm: FormGroup;
userLogin:userLogin;
constructor(private router: Router){}
ngOnInit(): void {
  this.registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required)
  });
  this.loginForm = new FormGroup({
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required)
  });
 
}

openModal(){
  this.abriModal.showModal = true;
}
registre() {
  if (this.registroForm.valid) {
    this.userSrv.registrarUsuario(this.registroForm.value).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente', response);
        this.abriModal.showModal = false;
        this.registroForm.reset();
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
        // Manejar el error, mostrar mensaje al usuario
      }
    );
  } else {
    
    Object.values(this.registroForm.controls).forEach((control:any) => {
      control.markAsTouched();
    });
  }
}
generateToken(length: number = 32): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  console.log('token', token);
  return token;
}
login() {
  if (this.loginForm.valid) {
    this.userSrv.loginUsuario(this.loginForm.value).subscribe(
      (response) => {
        const token = this.generateToken(); 
        sessionStorage.setItem('authToken', token)
       
        this.router.navigate(['/dashBoard']); 
      },
      (error) => {
        alert("correo  o contraseña invalido");
        console.error('Error al iniciar sesión', error);
        // Manejar el error, mostrar mensaje al usuario (por ejemplo, credenciales inválidas)
      }
    );
  } else {
    console.log("forminvalid", this.loginForm.getRawValue());
    
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}


}
