import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleOrderComponent } from './view-single-order.component';

describe('ViewSingleOrderComponent', () => {
  let component: ViewSingleOrderComponent;
  let fixture: ComponentFixture<ViewSingleOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
