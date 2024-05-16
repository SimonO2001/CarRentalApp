import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CustomersComponent } from './components/customers/customers.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { LandingComponent } from './components/landing/landing.component';
import { RoleGuard } from './guards/role-guard';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { ShowroomComponent } from './components/showroom/showroom.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'; 
import { InsuranceComponent } from './components/insurance/insurance.component';
import { InsuranceFormComponent } from './components/insurance-form/insurance-form.component';
import { RentalContractComponent } from './components/rental-contract/rental-contract.component';
import { RentalContractEditComponent } from './components/rental-contract-edit/rental-contract-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'showroom', component: ShowroomComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'vehicles', component: VehiclesComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
      { path: 'vehicles/add', component: VehicleEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'vehicles/edit/:id', component: VehicleEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'vehicles/details/:id', component: VehicleDetailsComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
      { path: 'customers', component: CustomersComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
      { path: 'customers/add', component: CustomerEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'customers/edit/:id', component: CustomerEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'insurances', component: InsuranceComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
      { path: 'insurances/add', component: InsuranceFormComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'insurances/edit/:id', component: InsuranceFormComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } }, // Added route
      { path: 'rental-contracts', component: RentalContractComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin', 'Default'] } },
      { path: 'rental-contracts/add', component: RentalContractEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } },
      { path: 'rental-contracts/edit/:id', component: RentalContractEditComponent, canActivate: [RoleGuard], data: { requiredRoles: ['Admin'] } }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
