import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../../services/insurance.service';
import { Insurance } from '../../models/insurance.model';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  insurances: Insurance[] = [];

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.loadInsurances();
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe({
      next: (insurances: Insurance[]) => this.insurances = insurances,
      error: (err: any) => console.error('Failed to load insurances:', err)
    });
  }

  deleteInsurance(id: number): void {
    if (confirm("Are you sure you want to delete this insurance?")) {
      this.insuranceService.deleteInsurance(id).subscribe({
        next: () => {
          alert("Insurance deleted successfully.");
          this.loadInsurances(); // Refresh the list after deletion
        },
        error: (err: any) => {
          alert("There was an error deleting the insurance.");
          console.error(err);
        }
      });
    }
  }
}
