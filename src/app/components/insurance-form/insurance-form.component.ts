import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { Insurance } from '../../models/insurance.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
  insuranceForm: FormGroup;
  isEditMode: boolean = false;
  insuranceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.insuranceForm = this.fb.group({
      provider: ['', Validators.required],
      policyNumber: ['', Validators.required],
      coverage: ['', Validators.required],
      costADay: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.insuranceId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    this.isEditMode = !!this.insuranceId;

    if (this.isEditMode && this.insuranceId) {
      this.loadInsurance(this.insuranceId);
    }
  }

  loadInsurance(id: number): void {
    this.insuranceService.getInsuranceById(id).subscribe({
      next: (insurance: Insurance) => {
        this.insuranceForm.patchValue(insurance);
        console.log('Insurance loaded:', insurance);
      },
      error: (err: any) => console.error('Failed to load insurance:', err)
    });
  }

  onSubmit(): void {
    if (this.insuranceForm.valid) {
      const insurance: Insurance = this.insuranceForm.value;
      if (this.isEditMode && this.insuranceId) {
        insurance.id = this.insuranceId;
        this.insuranceService.updateInsurance(insurance).subscribe({
          next: () => this.router.navigate(['/insurances']),
          error: (err) => console.error('Failed to update insurance:', err)
        });
      } else {
        this.insuranceService.addInsurance(insurance).subscribe({
          next: () => this.router.navigate(['/insurances']),
          error: (err) => console.error('Failed to add insurance:', err)
        });
      }
    }
  }
}
