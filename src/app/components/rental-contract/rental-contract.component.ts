import { Component, OnInit } from '@angular/core';
import { RentalContractService } from '../../services/rental-contract.service';
import { RentalContract } from '../../models/rental-contract.model';

@Component({
  selector: 'app-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.css']
})
export class RentalContractComponent implements OnInit {
  rentalContracts: RentalContract[] = [];

  constructor(private rentalContractService: RentalContractService) {}

  ngOnInit(): void {
    this.loadRentalContracts();
  }

  loadRentalContracts(): void {
    this.rentalContractService.getRentalContracts().subscribe({
      next: (rentalContracts) => this.rentalContracts = rentalContracts,
      error: (err) => console.error('Failed to load rental contracts:', err)
    });
  }

  deleteRentalContract(id: number): void {
    if (confirm("Are you sure you want to delete this rental contract?")) {
      this.rentalContractService.deleteRentalContract(id).subscribe(() => {
        alert("Rental contract deleted successfully.");
        this.loadRentalContracts(); // Refresh the list after deletion
      }, error => {
        alert("There was an error deleting the rental contract.");
        console.error(error);
      });
    }
  }
}
