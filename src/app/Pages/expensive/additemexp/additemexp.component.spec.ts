import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemexpComponent } from './additemexp.component';

describe('AdditemexpComponent', () => {
  let component: AdditemexpComponent;
  let fixture: ComponentFixture<AdditemexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditemexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
