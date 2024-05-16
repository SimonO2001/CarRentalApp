import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
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

  navigateToAddInsurance(): void {
    if (this.vehicle) {
      this.router.navigate(['/insurance/create']);
    }
  }

  navigateToRentalForm(): void {
    if (this.vehicle) {
      this.router.navigate(['/rental-contract/create', this.vehicle.id]);
    }
  }
}
