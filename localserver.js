const express = require('express');
const app = express();

// Starting localserver
app.set('port', 900);
app.get('/', function (request, responce) {
    const result = 'App is running!'
    responce.send(result)
}).listen(app.get('port'), function () {
    console.log(`App is running on port`, app.get('port'));
})