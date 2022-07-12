import { StoresApi, OrdersApi, Order } from '@flipdish/api-client-typescript';
import { OrderDto } from './models/orderdto';

const express = require( "express" );
//import https from 'https';
const app = express();
const port = 3000; // default port to listen

//var Flipdish = require('@flipdish/api-client-javascript');

  
function getOrderSummariesWithFulfillmentInfo() : Promise<Array<OrderDto>> {
    return new Promise<Array<OrderDto>>((resolve, reject) => {
            let ordersApi = new OrdersApi();
            ordersApi.accessToken = '';
            //storesApi.getStores('mexican cafe', 1, 20)
            ordersApi.getOrdersSummary("fd15009")
            .then(response => {
                //response.body.Data.map(store => console.log(store));
                let orders = response.body.Data;
                let orderIds : Array<number> = new Array();
                let orderDtos : Array<OrderDto> = new Array();
                orders.forEach(order => {
                    orderIds.push(order.OrderId);
                    let ord: OrderDto = new OrderDto();
                    ord.id = order.OrderId;
                    ord.name = order.CustomerName;
                    ord.orderAmount = order.Amount;
                    ord.requestedFor = order.RequestedForTime.toISOString();
                    orderDtos.push(ord);
                });
                let orderIdsString = orderIds.join(",");
                //console.log('Ids: ' + orderIdsString);
                ordersApi.searchFulfillmentStatuses("fd15009", orderIdsString)
                .then(response2 => {
                    let fulfillmentResults = response2.body.Data;
                    //response2.body.Data.map(status2 => console.log(status2));
                    fulfillmentResults.forEach( fulfillment => {
                        let orderId = fulfillment.OrderId;
                        let dtoForIndex = orderDtos.find( el => el.id == orderId);
                        if (dtoForIndex) {
                            dtoForIndex.fulfillmentStatus = fulfillment.StatusId;
                        }
                    });

                    //console.log(JSON.stringify(orderDtos));
                    resolve(orderDtos);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            }).catch(error => {
                console.error(error);    
                reject(error);
            });
    });
}

app.get( "/api/ordersummaries", ( req, res ) => {
    getOrderSummariesWithFulfillmentInfo()
    .then((results) => {
        res.send(JSON.stringify(results));
    });
});
    

// define a route handler for the default home page
app.get( "/api/test", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );