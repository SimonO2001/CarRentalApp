import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit, AfterViewInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngAfterViewInit(): void {
    this.muteVideos();
    this.adjustVideoPlayback();
  }

  muteVideos(): void {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true; // Ensure video is muted
      video.play().catch(e => console.log('Error playing video:', e)); // Auto-play handling
    });
  }

  adjustVideoPlayback(): void {
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => {
      if (index !== 0) { // Skips the first video
        video.playbackRate = 0.5; // Slow down the video to half speed
      }
    });
}

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }
}
