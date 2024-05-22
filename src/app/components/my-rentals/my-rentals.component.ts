// src/app/components/my-rentals/my-rentals.component.ts
import { Component, OnInit } from '@angular/core';
import { RentalContractService } from '../../services/rental-contract.service';
import { RentalContract } from '../../models/rental-contract.model';

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.css']
})
export class MyRentalsComponent implements OnInit {
  rentalContracts: RentalContract[] = [];

  constructor(private rentalContractService: RentalContractService) {}

  ngOnInit(): void {
    this.loadMyRentalContracts();
  }

  loadMyRentalContracts(): void {
    this.rentalContractService.getUserRentalContracts().subscribe({
      next: (contracts) => this.rentalContracts = contracts,
      error: (err) => console.error('Failed to load rental contracts', err)
    });
  }
}