import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalContractService } from '../../services/rental-contract.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InsuranceService } from '../../services/insurance.service';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { Customer } from '../../models/customer.model';
import { Insurance } from '../../models/insurance.model';
import { RentalContract } from '../../models/rental-contract.model';

@Component({
  selector: 'app-rental-contract-edit',
  templateUrl: './rental-contract-edit.component.html',
  styleUrls: ['./rental-contract-edit.component.css']
})
export class RentalContractEditComponent implements OnInit {
  rentalContractForm: FormGroup;
  rentalContractId: number | null = null;
  insurances: Insurance[] = [];
  vehicle: Vehicle | null = null;

  constructor(
    private fb: FormBuilder,
    private rentalContractService: RentalContractService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private insuranceService: InsuranceService,
    private vehicleService: VehicleService
  ) {
    this.rentalContractForm = this.fb.group({
      vehicleId: ['', Validators.required],
      customerId: ['', Validators.required],
      insuranceId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalCost: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.rentalContractId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    const vehicleId = +this.route.snapshot.queryParamMap.get('vehicleId')!;
    console.log('Vehicle ID from URL:', vehicleId);
    this.loadVehicle(vehicleId);
    this.loadInsurances();

    if (this.rentalContractId) {
      this.loadRentalContract();
    } else {
      const customerId = this.authService.getUserId();
      console.log('Customer ID:', customerId); // Log customer ID
      if (customerId !== null) {
        this.rentalContractForm.patchValue({ customerId, vehicleId });
        console.log('Form Value after patch:', this.rentalContractForm.value); // Log form value after patch
      } else {
        console.error('Failed to get customer ID');
      }
    }

    this.rentalContractForm.get('startDate')?.valueChanges.subscribe(() => this.calculateTotalCost());
    this.rentalContractForm.get('endDate')?.valueChanges.subscribe(() => this.calculateTotalCost());
    this.rentalContractForm.get('insuranceId')?.valueChanges.subscribe(() => this.calculateTotalCost());
  }

  loadVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle: Vehicle) => {
        this.vehicle = vehicle;
        this.rentalContractForm.patchValue({ vehicleId: id });
        console.log('Vehicle loaded:', vehicle);
        this.calculateTotalCost(); // Calculate total cost when vehicle is loaded
      },
      error: (err: any) => console.error('Failed to load vehicle:', err)
    });
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe({
      next: (insurances: Insurance[]) => this.insurances = insurances,
      error: (err: any) => console.error('Failed to load insurances:', err)
    });
  }

  loadRentalContract(): void {
    if (this.rentalContractId !== null) {
      this.rentalContractService.getRentalContractById(this.rentalContractId).subscribe({
        next: (rentalContract: RentalContract) => {
          this.rentalContractForm.patchValue(rentalContract);
          console.log('Rental Contract loaded:', rentalContract);
        },
        error: (err: any) => console.error('Failed to load rental contract:', err)
      });
    }
  }

  calculateTotalCost(): void {
    const startDate = new Date(this.rentalContractForm.get('startDate')?.value);
    const endDate = new Date(this.rentalContractForm.get('endDate')?.value);
    const insuranceId = +this.rentalContractForm.get('insuranceId')?.value;

    if (startDate && endDate && insuranceId && this.vehicle) {
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const insurance = this.insurances.find(i => i.id === insuranceId);
      if (insurance && insurance.costADay !== undefined && this.vehicle.rentalRate !== undefined) {
        const insuranceCost = days * insurance.costADay;
        const vehicleCost = days * this.vehicle.rentalRate;
        const totalCost = insuranceCost + vehicleCost;
        console.log('Total Cost Calculated:', totalCost);
        this.rentalContractForm.patchValue({ totalCost: totalCost.toFixed(2) });
      }
    }
  }

  onSubmit(): void {
    if (this.rentalContractForm.valid) {
      this.rentalContractForm.get('totalCost')?.enable();

      const rentalContract: RentalContract = {
        id: this.rentalContractId ?? 0,  // or make id optional in RentalContract interface
        vehicleId: +this.rentalContractForm.get('vehicleId')?.value,
        customerId: +this.rentalContractForm.get('customerId')?.value,
        insuranceId: +this.rentalContractForm.get('insuranceId')?.value,
        startDate: this.rentalContractForm.get('startDate')?.value,
        endDate: this.rentalContractForm.get('endDate')?.value,
        totalCost: parseFloat(this.rentalContractForm.get('totalCost')?.value),
        vehicle: this.vehicle!,  // Use non-null assertion operator
        customer: { id: +this.rentalContractForm.get('customerId')?.value } as Customer, // Fill this properly
        insurance: { id: +this.rentalContractForm.get('insuranceId')?.value } as Insurance // Fill this properly
      };

      this.rentalContractForm.get('totalCost')?.disable();

      console.log('Rental Contract Data:', rentalContract);

      if (this.rentalContractId) {
        this.rentalContractService.updateRentalContract(rentalContract).subscribe({
          next: () => this.router.navigate(['/rental-contracts']),
          error: (err: any) => console.error('Failed to update rental contract:', err)
        });
      } else {
        this.rentalContractService.addRentalContract(rentalContract).subscribe({
          next: () => this.router.navigate(['/rental-contracts']),
          error: (err: any) => console.error('Failed to add rental contract:', err)
        });
      }
    } else {
      this.logFormErrors();
      console.error('Form is invalid');
    }
  }

  private logFormErrors(): void {
    Object.keys(this.rentalContractForm.controls).forEach(key => {
      const controlErrors = this.rentalContractForm.get(key)?.errors;
      if (controlErrors) {
        console.error('Form Control Error:', key, controlErrors);
      }
    });
  }
}
