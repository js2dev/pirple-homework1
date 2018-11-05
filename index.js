/*
 * Homework Assignment #1
 * Author: Jonatas Souza
 */

// Dependencies
const http = require('http');
const url = require('url');

// Instantiate the server
var helloServer = http.createServer(function(req, res){
    let parsedUrl = url.parse(req.url, true);
    let paths = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    req.on('data', function(data) {
        console.log(data);
    });

    req.on('end', () => {
        let chosenHandler = typeof(router[paths]) !== 'undefined' ? router[paths] : handlers.notFound;

        // Returning data
        let data = {
            'message': 'Welcome Foreign!'
        };

        // Rout the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
                // Use the status code called back by the handler, or default to 200
                statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

                // Use the payload called back by the handler, or default to an empty object
                payload = typeof(payload) == 'object' ? payload : {};

                // Convert the payload to a string
                let payloadString = JSON.stringify(payload);

                // Return the  response
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(payloadString);

                // Log the request path
                console.log('Returning this response ', statusCode, payloadString);
        });
    })
});

// Start the server
helloServer.listen(3000, () => console.log('Server started.'));

// Define the handlers
var handlers = {
    // Sample Handler
    hello: (data, callback) => {
        // Callback a http status code, and a payload object
        callback(200, data);
    },
    // Not found Handler
    notFound: (data, callback) => {
        callback(404);
    }
};

// Define a request router
var router = {
     'hello': handlers.hello
};