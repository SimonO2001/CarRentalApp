import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/Authentication';
  private customerApiUrl = 'https://localhost:7110/api/Customer'; // Specific endpoint for CustomerController
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: Login): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => {
        const decodedToken: any = jwtDecode(response.token);
        const user = { token: response.token, decoded: decodedToken, refreshToken: response.refreshToken };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(registerData: Register): Observable<any> {
    const registerUrl = `${this.customerApiUrl}/register`; // Use the customer-specific endpoint
    return this.http.post<any>(registerUrl, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.token : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(roles: string | string[]): boolean {
    const currentUser = this.currentUserSubject.value;
    const userRoles = currentUser?.decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (!userRoles) {
      return false;
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }

    if (Array.isArray(userRoles)) {
      return roles.some(role => userRoles.includes(role));
    }
    return roles.includes(userRoles);
  }

  refreshToken(): Observable<any> {
    const currentUser = this.currentUserValue;
    const refreshToken = currentUser ? currentUser.refreshToken : null;
    if (!refreshToken) {
      return of(null);
    }

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { token: currentUser.token, refreshToken }).pipe(
      tap(response => {
        if (response && response.token) {
          const decodedToken: any = jwtDecode(response.token);
          const user = { token: response.token, decoded: decodedToken, refreshToken: response.refreshToken };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }

  getUserId(): number | null {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.decoded && currentUser.decoded.userId ? parseInt(currentUser.decoded.userId, 10) : null;
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
}