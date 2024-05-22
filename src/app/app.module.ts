import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CustomersComponent } from './components/customers/customers.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { LandingComponent } from './components/landing/landing.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ShowroomComponent } from './components/showroom/showroom.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { InsuranceFormComponent } from './components/insurance-form/insurance-form.component';
import { RentalContractComponent } from './components/rental-contract/rental-contract.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { RentalContractEditComponent } from './components/rental-contract-edit/rental-contract-edit.component';
import { ServiceRecordComponent } from './components/service-record/service-record.component';
import { ServiceRecordsComponent } from './components/service-records/service-records.component';
import { ServiceRecordEditComponent } from './components/service-record-edit/service-record-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VehiclesComponent,
    CustomersComponent,
    VehicleEditComponent,
    LoginComponent,
    CustomerEditComponent,
    LandingComponent,
    LandingLayoutComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    ShowroomComponent,
    VehicleDetailsComponent,
    InsuranceFormComponent,
    RentalContractComponent,
    InsuranceComponent,
    RentalContractEditComponent,
    ServiceRecordComponent,
    ServiceRecordsComponent,
    ServiceRecordEditComponent,
    RegisterComponent,
    MyRentalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule  // Add ReactiveFormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
