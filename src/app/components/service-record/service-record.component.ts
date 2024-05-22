// src/app/components/service-record/service-record.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceRecordService } from '../../services/service-record.service';
import { ServiceRecord } from '../../models/service-record.model';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-service-record',
  templateUrl: './service-record.component.html',
  styleUrls: ['./service-record.component.css']
})
export class ServiceRecordComponent implements OnInit {
  vehicleId!: number;
  serviceRecords: ServiceRecord[] = [];
  vehicle!: Vehicle;

  constructor(
    private serviceRecordService: ServiceRecordService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = +params.get('id')!;
      this.loadVehicle();
      this.loadServiceRecords();
    });
  }

  loadVehicle(): void {
    this.vehicleService.getVehicle(this.vehicleId).subscribe({
      next: (vehicle) => this.vehicle = vehicle,
      error: (err) => console.error('Failed to load vehicle:', err)
    });
  }

  loadServiceRecords(): void {
    this.serviceRecordService.getServiceRecords(this.vehicleId).subscribe({
      next: (records) => this.serviceRecords = records,
      error: (err) => console.error('Failed to load service records:', err)
    });
  }
}
