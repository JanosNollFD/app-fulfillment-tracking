import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ORDERS } from '../mock-orders';
import { OrderfulfillmentService } from '../orderfulfillment.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  dataSource: Order[] = [];
  displayedColumns: string[] = ['id', 'name', 'fulfillmentStatus', 'requestedFor', 'orderAmount'];
  //selectedHero: Order | undefined;

  constructor(private orderfulfillmentService: OrderfulfillmentService) { }

  getOrders(): void {
    this.orderfulfillmentService.getOrders()
      .subscribe( orders => {
        orders.forEach( o => {
          o.possibleStatuses = [
            { value: o.fulfillmentStatusId, viewValue: o.fulfillmentStatusName },
          ];
          if (o.fulfillmentStatusId != "preparing")
            o.possibleStatuses.push({ value: "preparing", viewValue: "Preparing" });
          if (o.fulfillmentStatusId != "ready-to-collect")
            o.possibleStatuses.push({ value: "ready-to-collect", viewValue: "Ready to collect" });
        });
        this.dataSource = orders;
      });
  }

  onFulfillmentStateChange( data: any ): void {
    const sourceElement = data.source;
    let selectedValue = data.value;
  }
  onFulfillmentStateChangeItem( order: Order, newState: string ): void {
    if (order.fulfillmentStatusId == newState) {
      console.log('No change');
      return;
    }
    console.log(`Change: ${order.id} to ${newState}`);
    this.orderfulfillmentService.setOrderFulfillmentState(order.id, newState);
  }
  

  ngOnInit() {
    this.getOrders();
  }
}
