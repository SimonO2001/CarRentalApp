import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-layout', // Unique selector
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css']
})
export class LandingLayoutComponent implements OnInit {
  isAdmin: boolean = false;
  navbarVisible: boolean = false;  // Controls the visibility of the navbar
  currentUser: any;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }

  ngOnInit() {
    console.log("LandingLayoutComponent is active");
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollThreshold = window.innerHeight * 0.1;
    const scrollY = window.scrollY;
    this.navbarVisible = scrollY > scrollThreshold;
    console.log('Scroll Y:', scrollY, 'Threshold:', scrollThreshold, 'Navbar Visible:', this.navbarVisible);
  }

  logout(): void {
    this.authService.logout();
  }
}
