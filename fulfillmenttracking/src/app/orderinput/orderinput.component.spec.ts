import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinputComponent } from './orderinput.component';

describe('OrderinputComponent', () => {
  let component: OrderinputComponent;
  let fixture: ComponentFixture<OrderinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});