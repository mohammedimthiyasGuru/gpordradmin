import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationOrder } from './notification.order';

describe('NotificationOrder', () => {
  let component: NotificationOrder;
  let fixture: ComponentFixture<NotificationOrder>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationOrder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
