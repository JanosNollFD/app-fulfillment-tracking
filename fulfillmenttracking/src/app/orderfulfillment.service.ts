import { Injectable } from '@angular/core';
import { Order } from "./models/order"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderfulfillmentService {
  private orderSummaryServiceUrl = 'api/ordersummaries';
  private orderFulfillmentChangeUrl = 'api/orderfulfillmentstatechange';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderSummaryServiceUrl);
  }
  setOrderFulfillmentState(orderId: number, newState: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //Authorization: 'my-auth-token'
      })
    };
    const body = {
      orderId: orderId,
      newState: newState
    };
    this.http.post(this.orderFulfillmentChangeUrl, body, httpOptions)
    .subscribe( r => {
      console.log('Post done');
    });
  }
}
