import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7110/api/Customer';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer, { headers: this.getHeaders() });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer, { headers: this.getHeaders() });
  }

  deleteCustomer(id: number): Observable<any> {
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
