var express = require('express');
var app = express();

app.use('/about', (req, res) => {
    res.send("this is about page");
});

app.use('/login', (req, res) => {
    res.send("this is the login page");
});

app.use('/public', express.static('static_files'));

app.use( /*default*/ (req, res) => {
     res.status(404).send("no encontra el recurso solicitado");
});

//app.use( /*default*/ (req, res) => {
//  res.status(404).sendFile(__dirname + "/static_files/404.html");
//});


//app.use('/', (req, res) => {
        // res.send("hello world, ramiro!!");
// })

app.listen(3000, () => {
    console.log("listen to port 3000");
})