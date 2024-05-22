import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  currentUser: any;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
