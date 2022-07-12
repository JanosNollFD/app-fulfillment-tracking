const express = require( "express" );
//import https from 'https';
const app = express();
const port = 3000; // default port to listen

// define a route handler for the default home page
app.get( "/api/test", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );