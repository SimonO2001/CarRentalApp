import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // In LoginComponent
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Attempting to navigate to dashboard');
          this.router.navigate(['/dashboard']).then(success => {
            console.log('Navigation success:', success);
          }).catch(err => {
            console.log('Navigation error:', err);
          });
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Failed to log in, please check your credentials and try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }
}
