import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';
import { Customer } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/Authentication'; // Base API URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: Login): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, credentials, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      map(response => {
        console.log('Login response:', response);
        const decodedToken = jwtDecode(response.token);
        console.log('Decoded Token:', decodedToken);

        localStorage.setItem('currentUser', JSON.stringify({ token: response.token, decoded: decodedToken }));
        this.currentUserSubject.next({ token: response.token, decoded: decodedToken });

        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.token : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUserSubject.value;
    const roles = currentUser && currentUser.decoded ? currentUser.decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : [];
    return Array.isArray(roles) ? roles.includes(role) : roles === role;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.decoded && currentUser.decoded.userId ? currentUser.decoded.userId : null;
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7110/api/Customer/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}