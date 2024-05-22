import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRecordsComponent } from './service-records.component';

describe('ServiceRecordsComponent', () => {
  let component: ServiceRecordsComponent;
  let fixture: ComponentFixture<ServiceRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRecordsComponent]
    });
    fixture = TestBed.createComponent(ServiceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
