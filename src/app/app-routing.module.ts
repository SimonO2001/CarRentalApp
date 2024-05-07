import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CustomersComponent } from './components/customers/customers.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component'; // Correct the path if necessary
import { RoleGuard } from './guards/role-guard'; // Update this path according to your project structure

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
  { path: 'vehicles/add', component: VehicleEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
  { path: 'vehicles/edit/:id', component: VehicleEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
  { path: 'customers', component: CustomersComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
  { path: 'customers/add', component: CustomerEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
  { path: 'customers/edit/:id', component: CustomerEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
