import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ServiceRecord } from '../models/service-record.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRecordService {
  private apiUrl = 'https://localhost:7110/api/ServiceRecord';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllServiceRecords(): Observable<ServiceRecord[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<ServiceRecord[]>(this.apiUrl, { headers });
  }

  getServiceRecords(vehicleId: number): Observable<ServiceRecord[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<ServiceRecord[]>(`${this.apiUrl}?vehicleId=${vehicleId}`, { headers });
  }

  getServiceRecord(id: number): Observable<ServiceRecord> {
    return this.http.get<ServiceRecord>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addServiceRecord(serviceRecord: ServiceRecord): Observable<ServiceRecord> {
    return this.http.post<ServiceRecord>(this.apiUrl, serviceRecord, { headers: this.getHeaders() });
  }

  updateServiceRecord(serviceRecord: ServiceRecord): Observable<ServiceRecord> {
    return this.http.put<ServiceRecord>(`${this.apiUrl}/${serviceRecord.id}`, serviceRecord, { headers: this.getHeaders() });
  }

  deleteServiceRecord(id: number): Observable<any> {
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
