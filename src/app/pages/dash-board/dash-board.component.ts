import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Router, RouterOutlet } from '@angular/router';
import { NavDashboardComponent } from '../../components/nav-dashboard/nav-dashboard.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [NavDashboardComponent, HeaderComponent,RouterOutlet],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('DashboardComponent: ngOnInit llamado.'); 
    if (!this.authService.isAuthenticated()) {
      console.log('DashboardComponent: Usuario no autenticado, redirigiendo.'); 
      this.authService.redirectToLogin();
      return;
    }
    this.authService.startTokenExpirationTimer();
    console.log('DashboardComponent: Temporizador de verificación del token iniciado.'); 
  }
  ngOnDestroy(): void {
    this.authService.stopTokenExpirationTimer(); 
  }
}
