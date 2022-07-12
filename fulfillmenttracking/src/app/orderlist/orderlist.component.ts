import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ORDERS } from '../mock-orders';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  //orders: Order[] = [];
  //orders: Order[] = ORDERS;
  dataSource: Order[] = ORDERS;
  displayedColumns: string[] = ['id', 'name', 'fulfillmentStatus', 'requestedFor', 'orderAmount'];
  //selectedHero: Order | undefined;

  //constructor(private service: OrdersService) { }
  constructor() { }

  ngOnInit() {
    //this.orders = this.service.getOrders();
  }
}
