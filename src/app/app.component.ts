// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  isAdmin: boolean = false;
  isScrolled: boolean = false; // Add this property
  currentUser: any; // Add this property
  title = 'CarRentalApp'; // Define the title property
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Update the currentUser property
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }
}
