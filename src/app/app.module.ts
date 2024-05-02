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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VehiclesComponent,
    CustomersComponent,
    VehicleEditComponent,
    LoginComponent
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
