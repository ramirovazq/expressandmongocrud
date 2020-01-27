var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/public', express.static('static_files'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/welcome', (req, res) => {
    res.send("bienvenido, welcome man");
});


app.use('/handleForm', 
    (req, res) => {
        console.log("req body .....");
        console.log(req.body);

        var name = req.body.username;
        var animals = req.body.animal;

        console.log("POST");
        console.log("name "+ name);
        console.log("animals "+ animals);

        res.send("Post recibido");
    }
    );

app.listen(3000, () => {
    console.log("listen to port 3000");
})