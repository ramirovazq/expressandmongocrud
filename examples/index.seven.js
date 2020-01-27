var express = require('express');
var app = express();

var nameFinder = (req, res, next) => {
    console.log("request query ...............");
    console.log(req.query);
    var name = req.query.name;
    if (name) req.username = name.toUpperCase();
    else req.username = 'Visitante';
    next();
};

var adminName = (req, res, next) => {
    req.username = 'Admin';
    next();
};

var greeter = (req, res, next) => {
    var method = req.method;
    var url = req.url;

    res.status(200).type('html');
    res.write('Hello, ' + req.username + ' method: ' + method + ' url: ' + url);
    next();
};

var logger = (req, res, next) => {
    var url = req.url;
    var time = new Date();
    console.log('Request recibido para la url -' + url + '- a las ' + time);
    next();
};

var commonRoute = express.Router();
commonRoute.use(logger, greeter);

app.use('/welcome', nameFinder, commonRoute, (req, res) => {
    res.end();
});

app.use('/admin', adminName, commonRoute, (req, res) => {
    res.end();
});

app.use('/name/:userName/location/:userLocation', 
    (req, res) => {
        var params = req.params;
        console.log("params ...");
        console.log(params);

        var name = params.userName;
        var location = params.userLocation;

        var length = Object.keys(params).length;
        console.log("number of params :" + length);

        res.send("Hola mundo");
    }
    );

app.listen(3000, () => {
    console.log("listen to port 3000");
})