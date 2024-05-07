import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      phone: [''],
      email: [''],
      password: [''],
      role: [''],
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.customerId = +id;
      this.customerService.getCustomerById(this.customerId).subscribe(customer => this.customerForm.patchValue(customer));
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customer: Customer = this.customerForm.value;
      customer.id = this.customerId;

      if (this.customerId) {
        this.customerService.updateCustomer(customer).subscribe({
          next: () => this.router.navigate(['/customers']),
          error: (error) => {
            console.error('Error updating customer:', error);
            alert(`Failed to update customer. Error: ${this.extractErrorMessage(error)}`);
          }
        });
      } else {
        this.customerService.addCustomer(customer).subscribe({
          next: () => this.router.navigate(['/customers']),
          error: (error) => {
            console.error('Failed to add customer:', error);
            alert(`Failed to add customer. Error: ${this.extractErrorMessage(error)}`);
          }
        });
      }
    } else {
      alert('Please ensure all required fields are filled correctly.');
    }
  }

  extractErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    } else {
      return error.error.title || error.message || 'An unexpected error occurred.';
    }
  }
}
