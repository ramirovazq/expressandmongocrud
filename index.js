var express = require('express');
var app = express();

app.set('view engine', 'ejs')
var bodyParser = require('body-parser');
var Person = require('./Person.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('static_files'));


app.use('/delete', (req,res) => {
    searchName =  req.body.username;
    Person.findOneAndDelete ( {name: searchName}, (err, person) => {
        if (err) {
            res.type('html').status(500);
            res.send("Error, de la bd:" + err);
        } else if (!person) {
            res.type('html').status(200);
            res.send("No se encuentra una persona con:" + searchName);
        } else {
            // res.type('html').status(200);
            // res.send("Se ha borrado la persona solicitada");     
            res.redirect('/all');           
        }

    });
});


app.use('/update', (req,res) => {
    searchName =  req.body.username;
    Person.findOne( {name: searchName}, (err, person) => {
        if (err) {
            res.type('html').status(500);
            res.send("Error, de la bd:" + err);
        } else if (!person) {
            res.type('html').status(200);
            res.send("No se encuentra una persona con:" + searchName);
        } else {
            person.age = req.body.age;
            person.save((err) => {
                if (err) {
                    res.type('html').status(500);
                    res.send('Error:' + err);
                } else {
                    res.render('updated', {person: person});
                }
            });
        }

    });
});


app.use('/person', (req,res) => {
    console.log("detalle de persona ....");
    var searchName = req.query.name;
    Person.findOne( {name: searchName}, (err, person) => {
        if (err) {
            res.type('html').status(500);
            res.send("Error, de la bd:" + err);
        } else if (!person) {
            res.type('html').status(200);
            res.send("No se encuentra una persona con:" + searchName);
        } else {
            res.render('personInfo', {person: person});
        }

    });
});

app.use('/all', (req,res) => {
    Person.find( (err, allPeople) => {
        if (err) {
            res.type('html').status(500);
            res.send("Error, que pues:" + err);
        }
        else if (allPeople.length == 0) {
            res.type('html').status(200);
            res.send("No hay datos .. plop");
        }
        else {
            res.render('showAll', {people: allPeople});
        }
    });
});

app.use('/create', (req, res) => {
    var newPerson = new Person({
        name: req.body.name,
        age: req.body.age,
        });

    newPerson.save((err) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error:' + err);
        } else {
            res.render('created', {person: newPerson});
        }
    });
});

app.use('/', (req, res) => {
    res.redirect('/public/personal.html');    
});


app.listen(3000, () => {
    console.log("listen to port 3000");
})