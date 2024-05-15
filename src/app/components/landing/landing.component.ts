import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
  
  vehicles: Vehicle[] = [];
  isLoading = false;
  error: string | null = null;
  message = 'Oksens Cardealership';
  displayText = '';
  isDeleting = false;
  typingSpeed = 150;

  constructor(private vehicleService: VehicleService, private router: Router) { } // Inject Router

  ngOnInit(): void {
    this.fetchVehicles();
    this.typeMessage();
  }

  ngAfterViewInit(): void {
    this.playAllVideos();
    this.setupScrollDown();
  }

  playAllVideos(): void {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.error("Error trying to play video: ", error));
    });
  }

  setupScrollDown(): void {
    const scrollDownElement = document.querySelector('.scroll-down');
    if (scrollDownElement) {
      scrollDownElement.addEventListener('click', () => {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      });
    }
  }

  fetchVehicles(): void {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Error fetching vehicles: ${err.message}`;
        this.isLoading = false;
      }
    });
  }

  typeMessage(): void {
    setTimeout(() => {
      this.displayText = this.isDeleting
        ? this.message.substring(0, this.displayText.length - 1)
        : this.message.substring(0, this.displayText.length + 1);

      if (!this.isDeleting && this.displayText === this.message) {
        setTimeout(() => this.isDeleting = true, 2000);
      } else if (this.isDeleting && this.displayText === '') {
        this.isDeleting = false;
      }

      if (!this.isDeleting || this.displayText !== '') {
        this.typeMessage();
      }
    }, this.isDeleting ? this.typingSpeed / 2 : this.typingSpeed);
  }

  // Navigation methods
  navigateToShowroom(): void {
    this.router.navigate(['/showroom']);
  }

  navigateToAboutUs(): void {
    this.router.navigate(['/about-us']);
  }

  navigateToEvents(): void {
    this.router.navigate(['/events']);
  }
}
