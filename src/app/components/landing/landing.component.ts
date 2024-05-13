import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  vehicles: Vehicle[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;  // Assuming this fetches highlighted or all vehicles as needed
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Error fetching vehicles: ${err.message}`;
        this.isLoading = false;
      }
    });
  }
}
