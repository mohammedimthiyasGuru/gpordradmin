import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormangerComponent } from './vendormanger.component';

describe('VendormangerComponent', () => {
  let component: VendormangerComponent;
  let fixture: ComponentFixture<VendormangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendormangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendormangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
