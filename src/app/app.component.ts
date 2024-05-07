// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRentalApp'; // Define the title property
  constructor(public authService: AuthService) {}

  get currentUser() {
    return this.authService.getCurrentUser();
  }
}
