import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRequestsComponent } from './warehouse-requests.component';

describe('WarehouseRequestsComponent', () => {
  let component: WarehouseRequestsComponent;
  let fixture: ComponentFixture<WarehouseRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
