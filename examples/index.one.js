var express = require('express');
var app = express();

app.use('/', (req, res) => {
		var method = req.method;
		var url = req.url;
		var agent = req.headers['user-agent'];
		agent = req.get('User-Agent');

		console.log("REQUEST_____________")
		console.log("method: " + method);
		console.log("url: "+ url);
		console.log("agent: "+ agent)

		var name = req.query.name; // e.g. /?name=ramiro
		res.status(200).type('html');
		if (name) {
			res.write("hi " + name + " its nice to see you dude");
		} else {
			res.write("welcome anonymous guest");
		}

		res.end()
		// res.send("hello world, ramiro!!");
})

app.listen(3000, () => {
	console.log("listen to port 3000");
})