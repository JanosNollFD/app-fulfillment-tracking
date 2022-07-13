import { TestBed } from '@angular/core/testing';
import { OrderfulfillmentService } from './orderfulfillment.service';

describe('OrderfulfillmentService', () => {
  let service: OrderfulfillmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderfulfillmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
