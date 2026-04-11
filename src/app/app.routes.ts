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
    { path: 'navbar', component: NavbarComponent }, 
    { path: 'galeria', component: GaleriaComponent },
    { path: 'home', component: HomeComponent },
    {
      path: 'dashboard',
      component: DashBoardComponent,
      children: [
        { path: '', redirectTo: 'usuarios', pathMatch: 'full' }, 
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'tareas', component: TareasComponent },
        
      ]
    },
    { path: 'dashBoard', redirectTo: '/dashboard' } 
  ];