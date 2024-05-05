import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model'; // Adjust path as needed
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      console.log(customers);
      this.customers = customers;
    });
  }

  deleteCustomer(id: number): void {
    if (confirm("Are you sure you want to delete this customer?")) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        alert("Customer deleted successfully.");
        this.getCustomers(); // Refresh the list after deletion
      }, error => {
        alert("There was an error deleting the customer.");
        console.error(error);
      });
    }
  }
}
