import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRecordEditComponent } from './service-record-edit.component';

describe('ServiceRecordEditComponent', () => {
  let component: ServiceRecordEditComponent;
  let fixture: ComponentFixture<ServiceRecordEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRecordEditComponent]
    });
    fixture = TestBed.createComponent(ServiceRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
