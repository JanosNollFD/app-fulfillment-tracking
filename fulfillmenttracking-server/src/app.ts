import { StoresApi, OrdersApi, Order } from '@flipdish/api-client-typescript';
import { OrderDto } from './models/orderdto';

const flipdishApiAccessToken: string = process.env.ACCESS_TOKEN || '';

const express = require( "express" );
const bodyParser = require("body-parser");
//import https from 'https';
const app = express();
const port = 3000; // default port to listen

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({
    extended: false
 }));*/

//var Flipdish = require('@flipdish/api-client-javascript');
console.log('Access token: ' + flipdishApiAccessToken);
const appId = "fd15009"; // Test store Janos London
  
function getOrderSummariesWithFulfillmentInfo() : Promise<Array<OrderDto>> {
    return new Promise<Array<OrderDto>>((resolve, reject) => {
            let ordersApi = new OrdersApi();
            ordersApi.accessToken = flipdishApiAccessToken;
            //storesApi.getStores('mexican cafe', 1, 20)
            ordersApi.getOrdersSummary(appId)
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
                    response2.body.Data.map(status2 => console.log(status2));
                    fulfillmentResults.forEach( fulfillment => {
                        let orderId = fulfillment.OrderId;
                        let dtoForIndex = orderDtos.find( el => el.id == orderId);
                        if (dtoForIndex) {
                            dtoForIndex.fulfillmentStatusId = fulfillment.StatusId;
                            dtoForIndex.fulfillmentStatusName = fulfillment.StatusName;
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

app.post( "/api/orderfulfillmentstatechange", (req, res) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(req.body);
    const orderId = req.body.orderId;
    const newState = req.body.newState;

    let ordersApi = new OrdersApi();
    ordersApi.accessToken = flipdishApiAccessToken;
    const statusRequest: any = {
        StatusId: newState
    };
    ordersApi.updateFulfillmentStatus(appId, orderId, statusRequest);

    res.send("{}");
}); 

// define a route handler for the default home page
app.get( "/api/test", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );