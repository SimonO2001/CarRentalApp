import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle | undefined;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getVehicleDetails();
  }

  getVehicleDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle) => this.vehicle = vehicle,
      error: (err) => console.error('Failed to get vehicle details:', err)
    });
  }
}
