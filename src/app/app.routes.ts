import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TareasComponent } from './components/tareas/tareas.component';

export const routes: Routes = [
    { path: '', redirectTo: '/galeria', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'navbar', component: NavbarComponent }, // Este parece ser un navbar fuera del dashboard
    { path: 'galeria', component: GaleriaComponent },
    { path: 'home', component: HomeComponent },
    {
      path: 'dashboard',
      component: DashBoardComponent,
      children: [
        { path: '', redirectTo: 'usuarios', pathMatch: 'full' }, // Redirige a /dashboard/usuarios por defecto
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'tareas', component: TareasComponent },
        // Puedes agregar más rutas hijas aquí para otras secciones del dashboard
      ]
    },
    { path: 'dashBoard', redirectTo: '/dashboard' } // Redirige la ruta duplicada
  ];