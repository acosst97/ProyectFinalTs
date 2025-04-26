import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-dashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-dashboard.component.html',
  styleUrl: './nav-dashboard.component.scss'
})
export class NavDashboardComponent {
 
}
