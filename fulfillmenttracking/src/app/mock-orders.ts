/**
 * export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
 */

import { Order } from './models/order';

export const ORDERS: Order[] = [
  { id: 1243001, fulfillmentStatus: "preparing", orderAmount: 21.50, paymentStatus: "paid", requestedFor: "15:20", name: "John Doe" },
  { id: 1243002, fulfillmentStatus: "preparing", orderAmount: 11.10, paymentStatus: "paid", requestedFor: "15:30", name: "Jane Doe" },
  { id: 1243005, fulfillmentStatus: "preparing", orderAmount: 5.50, paymentStatus: "paid", requestedFor: "15:50", name: "John2 Doe" },
  { id: 1243006, fulfillmentStatus: "preparing", orderAmount: 2.30, paymentStatus: "paid", requestedFor: "16:20", name: "John3 Doe" },
];