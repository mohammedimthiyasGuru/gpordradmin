import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendorpaymentComponent } from './viewvendorpayment.component';

describe('ViewvendorpaymentComponent', () => {
  let component: ViewvendorpaymentComponent;
  let fixture: ComponentFixture<ViewvendorpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendorpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendorpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
