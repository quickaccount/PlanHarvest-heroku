const express = require('express');

var app = express();

app.get('/', function (req, res) {
    // res.sendFile();
    console.log("hello")
});

var server = app.listen(process.env.PORT || 8080, function () {
    console.log("App now running on address: ", server.address());
});