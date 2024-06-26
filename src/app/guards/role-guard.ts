import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'] as Array<string>;
    console.log('Required Roles:', requiredRoles); // Debug log
    console.log('User Roles:', this.authService.currentUserValue?.decoded?.role); // Debug log
    if (this.authService.isAuthenticated() && requiredRoles.some(role => this.authService.hasRole(role))) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
