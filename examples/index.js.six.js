var express = require('express');
var app = express();

var logger = (req, res, next) => {
	var url = req.url;
	var time = new Date();
	console.log('Request recibido para la url -' + url + '- a las ' + time);
	next();
};


app.use('/about', (req, res) => {
	res.send("this is about page");
});

//app.use(logger);

app.use('/login', logger, (req, res) => {
	res.send("this is the login page");
});

app.use('/public', logger, express.static('static_files'));

app.use( /*default*/ (req, res) => {
	res.status(404).sendFile(__dirname + "/404.html");
});


app.listen(3000, () => {
	console.log("listen to port 3000");
})