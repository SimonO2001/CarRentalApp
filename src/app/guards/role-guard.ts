// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Update the path as per your structure

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'] as Array<string>;
    if (this.authService.isAuthenticated() && requiredRoles.some(role => this.authService.hasRole(role))) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
