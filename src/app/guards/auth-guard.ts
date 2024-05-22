import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const onlyNonLogged = route.data['onlyNonLogged'] as boolean;
    const isLoggedIn = this.authService.isAuthenticated();

    if (onlyNonLogged && isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    if (!onlyNonLogged && !isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}
