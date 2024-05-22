import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalContract } from '../models/rental-contract.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RentalContractService {
  private apiUrl = 'https://localhost:7110/api/RentalContract';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all rental contracts
  getRentalContracts(): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Get a rental contract by ID
  getRentalContractById(id: number): Observable<RentalContract> {
    return this.http.get<RentalContract>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new rental contract
  addRentalContract(rentalContract: RentalContract): Observable<RentalContract> {
    return this.http.post<RentalContract>(this.apiUrl, rentalContract, { headers: this.getHeaders() });
  }

  // Update an existing rental contract
  updateRentalContract(rentalContract: RentalContract): Observable<RentalContract> {
    return this.http.put<RentalContract>(`${this.apiUrl}/${rentalContract.id}`, rentalContract, { headers: this.getHeaders() });
  }

  // Delete a rental contract by ID
  deleteRentalContract(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Get rental contracts for the currently logged-in user
  getUserRentalContracts(): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(`${this.apiUrl}/my-rentals`, { headers: this.getHeaders() });
  }

  // Get HTTP headers including the authorization token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
