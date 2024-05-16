import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Insurance } from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'https://localhost:7110/api/Insurance';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getInsuranceById(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addInsurance(insurance: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(this.apiUrl, insurance, { headers: this.getHeaders() });
  }

  updateInsurance(insurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.apiUrl}/${insurance.id}`, insurance, { headers: this.getHeaders() });
  }

  deleteInsurance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
