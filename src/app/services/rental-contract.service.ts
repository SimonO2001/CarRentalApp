// src/app/services/rental-contract.service.ts
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

  getRentalContracts(): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRentalContractById(id: number): Observable<RentalContract> {
    return this.http.get<RentalContract>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addRentalContract(rentalContract: RentalContract): Observable<RentalContract> {
    return this.http.post<RentalContract>(this.apiUrl, rentalContract, { headers: this.getHeaders() });
  }

  updateRentalContract(rentalContract: RentalContract): Observable<RentalContract> {
    return this.http.put<RentalContract>(`${this.apiUrl}/${rentalContract.id}`, rentalContract, { headers: this.getHeaders() });
  }

  deleteRentalContract(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getUserRentalContracts(): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(`${this.apiUrl}/my-rentals`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}