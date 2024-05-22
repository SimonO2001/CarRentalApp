import { Component, OnInit } from '@angular/core';
import { ServiceRecord } from '../../models/service-record.model';
import { ServiceRecordService } from '../../services/service-record.service';

@Component({
  selector: 'app-service-records',
  templateUrl: './service-records.component.html',
  styleUrls: ['./service-records.component.css']
})
export class ServiceRecordsComponent implements OnInit {
  serviceRecords: ServiceRecord[] = [];

  constructor(private serviceRecordService: ServiceRecordService) { }

  ngOnInit(): void {
    this.getServiceRecords();
  }

  getServiceRecords(): void {
    this.serviceRecordService.getAllServiceRecords().subscribe(records => {
      console.log(records);  // Check the structure and data of service records
      this.serviceRecords = records;
    });
  }

  deleteServiceRecord(id: number): void {
    if (confirm("Are you sure you want to delete this service record?")) {
      this.serviceRecordService.deleteServiceRecord(id).subscribe(() => {
        alert("Service record deleted successfully.");
        this.getServiceRecords(); // Refresh the list after deletion
      }, error => {
        alert("There was an error deleting the service record.");
        console.error(error);
      });
    }
  }
}
