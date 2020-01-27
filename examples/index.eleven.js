var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use('/public', express.static('static_files'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/handleForm', (req, res) => {
    //console.log("en el POST ....... del handleForm");
    //console.log(req);
    
    var name = req.body.username;
    var animals = [].concat(req.body.animal);
    res.render('showAnimals', {name: name, animals: animals});
    
});

app.listen(3000, () => {
    console.log("listen to port 3000");
})
