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
  vehicleForm!: FormGroup;
  vehicleId?: number;
  selectedFile?: File;

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
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      vin: [''],
      status: [''],
      currentMileage: [''],
      rentalRate: [''],
      horsePower: [''],
      torque: ['']
    });

    // Fetch the vehicle id from the route parameters
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.vehicleId = +params['id'];
        this.loadVehicle(this.vehicleId);
      }
    });
  }

  loadVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle) => {
        console.log('Loaded Vehicle:', vehicle);
        this.vehicleForm.patchValue(vehicle);
      },
      error: (error) => console.error('Failed to load vehicle data:', error)
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = new FormData();
      Object.entries(this.vehicleForm.value).forEach(([key, value]) => {
        if (value != null && value !== '') {
          formData.append(key, value.toString());
        }
      });

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      // Add vehicle ID to the form data if it exists
      if (this.vehicleId) {
        formData.append('id', this.vehicleId.toString());
        this.updateVehicle(this.vehicleId, formData);
      } else {
        this.addVehicle(formData);
      }
    } else {
      alert('Please ensure all required fields are filled correctly.');
    }
  }

  addVehicle(formData: FormData): void {
    this.vehicleService.addVehicle(formData).subscribe({
      next: () => this.router.navigate(['/vehicles']),
      error: (error) => {
        console.error('Error adding vehicle:', error);
        alert(`Failed to add vehicle. Error: ${this.extractErrorMessage(error)}`);
      }
    });
  }

  updateVehicle(vehicleId: number, formData: FormData): void {
    this.vehicleService.updateVehicle(vehicleId, formData).subscribe({
      next: () => this.router.navigate(['/vehicles']),
      error: (error) => {
        console.error('Error updating vehicle:', error);
        alert(`Failed to update vehicle. Error: ${this.extractErrorMessage(error)}`);
      }
    });
  }

  extractErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    } else {
      return error.error.detail || error.message || 'An unexpected error occurred.';
    }
  }
}
