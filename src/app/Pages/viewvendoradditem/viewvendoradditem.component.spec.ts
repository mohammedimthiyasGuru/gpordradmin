import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendoradditemComponent } from './viewvendoradditem.component';

describe('ViewvendoradditemComponent', () => {
  let component: ViewvendoradditemComponent;
  let fixture: ComponentFixture<ViewvendoradditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendoradditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendoradditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
