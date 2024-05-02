// src/app/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customer } from '../models/customer.model'; // Make sure to define this model

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://localhost:7110/api/customer'; // Adjust URL as needed

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<customer> {
    return this.http.get<customer>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customer: customer): Observable<customer> {
    return this.http.post<customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: customer): Observable<customer> {
    return this.http.put<customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
