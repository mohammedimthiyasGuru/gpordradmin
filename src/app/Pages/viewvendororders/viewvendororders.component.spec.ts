import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendorordersComponent } from './viewvendororders.component';

describe('ViewvendorordersComponent', () => {
  let component: ViewvendorordersComponent;
  let fixture: ComponentFixture<ViewvendorordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendorordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendorordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
