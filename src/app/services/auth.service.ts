import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private expirationTime: number = 3 * 60 * 1000; 
  private tokenCheckInterval: number = 1 * 60 * 1000; 
  private intervalSubscription: Subscription | undefined;

  constructor(private router: Router) { }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    this.startTokenExpirationTimer();
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.stopTokenExpirationTimer();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  startTokenExpirationTimer(): void {
    this.stopTokenExpirationTimer();
    // console.log('AuthService: Iniciando el temporizador de verificación del token.'); 
    this.intervalSubscription = interval(this.tokenCheckInterval).subscribe(() => {
      this.checkTokenExpiration();
    });
  }

  stopTokenExpirationTimer(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  checkTokenExpiration(): void {
  
    const token = this.getToken();
    if (!token) {
      alert('AuthService: Token no encontrado. Redirigiendo al login.');
      this.redirectToLogin();
    } else {
      console.log('AuthService: Token aún presente.'); 
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

}
