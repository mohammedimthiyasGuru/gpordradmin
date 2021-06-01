import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemenusettingComponent } from './createmenusetting.component';

describe('CreatemenusettingComponent', () => {
  let component: CreatemenusettingComponent;
  let fixture: ComponentFixture<CreatemenusettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemenusettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemenusettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
