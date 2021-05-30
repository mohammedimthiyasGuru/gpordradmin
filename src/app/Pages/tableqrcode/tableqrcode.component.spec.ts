import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableqrcodeComponent } from './tableqrcode.component';

describe('TableqrcodeComponent', () => {
  let component: TableqrcodeComponent;
  let fixture: ComponentFixture<TableqrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableqrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
