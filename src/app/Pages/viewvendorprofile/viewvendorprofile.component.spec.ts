import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendorprofileComponent } from './viewvendorprofile.component';

describe('ViewvendorprofileComponent', () => {
  let component: ViewvendorprofileComponent;
  let fixture: ComponentFixture<ViewvendorprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendorprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
