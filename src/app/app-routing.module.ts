import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CustomersComponent } from './components/customers/customers.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/add', component: VehicleEditComponent },
  { path: 'vehicles/edit/:id', component: VehicleEditComponent },
  { path: 'customers', component: CustomersComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
