import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceRecordService } from '../../services/service-record.service';
import { ServiceRecord } from '../../models/service-record.model';

@Component({
  selector: 'app-service-record-edit',
  templateUrl: './service-record-edit.component.html',
  styleUrls: ['./service-record-edit.component.css']
})
export class ServiceRecordEditComponent implements OnInit {
  serviceRecordForm: FormGroup;
  serviceRecordId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceRecordService: ServiceRecordService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.serviceRecordForm = this.fb.group({
      vehicleId: ['', Validators.required],
      dateOfService: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.serviceRecordId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    if (this.serviceRecordId) {
      this.loadServiceRecord();
    }
  }

  loadServiceRecord(): void {
    if (this.serviceRecordId !== null) {
      this.serviceRecordService.getServiceRecord(this.serviceRecordId).subscribe({
        next: (record: ServiceRecord) => {
          this.serviceRecordForm.patchValue(record);
        },
        error: (err: any) => console.error('Failed to load service record:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.serviceRecordForm.valid) {
      const serviceRecord: ServiceRecord = {
        id: this.serviceRecordId ?? 0,
        vehicleId: +this.serviceRecordForm.get('vehicleId')?.value,
        dateOfService: this.serviceRecordForm.get('dateOfService')?.value,
        description: this.serviceRecordForm.get('description')?.value,
        cost: parseFloat(this.serviceRecordForm.get('cost')?.value)
      };

      if (this.serviceRecordId) {
        this.serviceRecordService.updateServiceRecord(serviceRecord).subscribe({
          next: () => this.router.navigate(['/service-records']),
          error: (err: any) => console.error('Failed to update service record:', err)
        });
      } else {
        this.serviceRecordService.addServiceRecord(serviceRecord).subscribe({
          next: () => this.router.navigate(['/service-records']),
          error: (err: any) => console.error('Failed to add service record:', err)
        });
      }
    } else {
      this.logFormErrors();
      console.error('Form is invalid');
    }
  }

  private logFormErrors(): void {
    Object.keys(this.serviceRecordForm.controls).forEach(key => {
      const controlErrors = this.serviceRecordForm.get(key)?.errors;
      if (controlErrors) {
        console.error('Form Control Error:', key, controlErrors);
      }
    });
  }
}
