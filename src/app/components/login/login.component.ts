// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Ensure path is correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Added the definite assignment assertion '!'
  errorMessage: string = ''; // To display error messages on the UI

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          // Ensure the backend response includes a token in the expected format
          // if (response && response.token) {
          //   localStorage.setItem('token', response.token);
          // } else {
          //   console.error('Login failed: Token not provided in response');
          //   this.errorMessage = 'Login failed due to server error';
          // }
        },
        error: (error) => {
          // Log the error and set a user-friendly error message
          console.error('Login error', error);
          this.errorMessage = error.error.message || 'Failed to log in, please check your credentials and try again.';
        }
      });
    } else {
      console.log('Form is invalid');
      // Provide a user-friendly message for form validation failure
      this.errorMessage = 'Please enter valid email and password.';
    }
  }
  
  
}
