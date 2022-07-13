export interface Order {
    id: number;
    fulfillmentStatusId: string;
    fulfillmentStatusName: string;
    requestedFor: string;
    orderAmount: number;
    paymentStatus: string;
    name: string;

    possibleStatuses?: FulfillmentStatusEntry[];
  }
  
export interface FulfillmentStatusEntry {
  value: string;
  viewValue: string;
}