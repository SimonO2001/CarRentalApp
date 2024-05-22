import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7110/api/Customer';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.get<Customer[]>(this.apiUrl, { headers: this.getHeaders() }))
          );
        }
        return throwError(error);
      })
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }))
          );
        }
        return throwError(error);
      })
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.post<Customer>(this.apiUrl, customer, { headers: this.getHeaders() }))
          );
        }
        return throwError(error);
      })
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer, { headers: this.getHeaders() }))
          );
        }
        return throwError(error);
      })
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }))
          );
        }
        return throwError(error);
      })
    );
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
