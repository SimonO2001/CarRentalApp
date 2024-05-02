// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Login failed: Token not provided in response');
            this.errorMessage = 'Login failed due to server error';
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'Failed to log in, please check your credentials and try again.';
        }
      });
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }
}
