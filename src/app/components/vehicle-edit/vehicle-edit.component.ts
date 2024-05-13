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
    vehicleId!: number;
    selectedFile!: File;

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

        const id = this.route.snapshot.params['id'];
        if (id) {
            this.vehicleId = +id;
            this.vehicleService.getVehicle(this.vehicleId).subscribe(vehicle => this.vehicleForm.patchValue(vehicle));
        }
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    onSubmit(): void {
        if (this.vehicleForm.valid) {
            const formData = new FormData();
            const vehicle: Vehicle = this.vehicleForm.value;
            vehicle.id = this.vehicleId;

            formData.append('type', vehicle.type ?? '');
            formData.append('make', vehicle.make ?? '');
            formData.append('model', vehicle.model ?? '');
            formData.append('year', vehicle.year?.toString() ?? '');
            formData.append('vin', vehicle.vin ?? '');
            formData.append('status', vehicle.status ?? '');
            formData.append('currentMileage', vehicle.currentMileage?.toString() ?? '');
            formData.append('rentalRate', vehicle.rentalRate?.toString() ?? '');

            if (this.selectedFile) {
                formData.append('file', this.selectedFile, this.selectedFile.name);
            }

            if (this.vehicleId) {
                this.vehicleService.updateVehicle(formData, this.vehicleId).subscribe({
                    next: () => this.router.navigate(['/vehicles']),
                    error: (error) => {
                        console.error('Error updating vehicle:', error);
                        alert(`Failed to update vehicle. Error: ${this.extractErrorMessage(error)}`);
                    }
                });
            } else {
                this.vehicleService.addVehicle(formData).subscribe({
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

    extractErrorMessage(error: any): string {
        if (error.error instanceof ErrorEvent) {
            return error.error.message;
        } else {
            return error.error.title || error.message || 'An unexpected error occurred.';
        }
    }
}
