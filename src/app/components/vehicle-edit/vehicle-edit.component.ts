import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  vehicleForm!: FormGroup;  // Using ! to assure TypeScript it will be initialized
  vehicleId!: number;      // Using ! to assure TypeScript it will be initialized

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      type: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: [''],
      status: [''],
      currentMileage: [''],
      rentalRate: ['']
    });

    // Conditional initialization based on route parameters
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.vehicleId = +id;
      this.vehicleService.getVehicle(this.vehicleId).subscribe(vehicle => this.vehicleForm.patchValue(vehicle));
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const vehicle: Vehicle = this.vehicleForm.value;
      vehicle.id = this.vehicleId;  // Ensure the ID is correctly set for both add and update
  
      // Check if we are updating or adding a new vehicle
      if (this.vehicleId) {
        this.vehicleService.updateVehicle(vehicle).subscribe({
          next: () => this.router.navigate(['/vehicles']),
          error: (error) => {
            console.error('Error updating vehicle:', error);
            alert(`Failed to update vehicle. Error: ${this.extractErrorMessage(error)}`);
          }
        });
      } else {
        this.vehicleService.addVehicle(vehicle).subscribe({
          next: () => this.router.navigate(['/vehicles']),
          error: (error) => {
            console.error('Failed to add vehicle:', error);
            alert(`Failed to add vehicle. Error: ${this.extractErrorMessage(error)}`);
          }
        });
      }
    } else {
      alert('Please ensure all required fields are filled correctly.');
    }
  }
  
  // Helper method to extract a detailed error message
  extractErrorMessage(error: any): string {
    // Attempt to use the backend provided error message, or default to a generic message
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      return error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return error.error.title || error.message || 'An unexpected error occurred.';
    }
  }
  
}
