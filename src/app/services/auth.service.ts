import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/api/Authentication'; // Adjust this URL to where your API is hosted

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<any> {
    return this.http.post<any>('https://localhost:7110/api/Authentication/login', credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
