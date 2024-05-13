import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://localhost:7110/api/Vehicle';  // URL to web API

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicle(id: number): Observable<Vehicle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vehicle>(url);
  }

  addVehicle(vehicleData: FormData): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicleData);
  }

  updateVehicle(vehicleData: FormData, id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, vehicleData);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Vehicle>(url);
  }
}
