import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      console.log(vehicles);  // Check the structure and data of vehicles
      this.vehicles = vehicles;
    });
  }
  

  deleteVehicle(id: number): void {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        alert("Vehicle deleted successfully.");
        this.getVehicles(); // Refresh the list after deletion
      }, error => {
        alert("There was an error deleting the vehicle.");
        console.error(error);
      });
    }
  }
  
}
