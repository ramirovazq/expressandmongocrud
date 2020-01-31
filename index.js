var express = require('express');
var app = express();

app.set('view engine', 'ejs')
var bodyParser = require('body-parser');
var Person = require('./Person.js')
var Book = require('./Book.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('static_files'));

app.use('/createBook', (req,res) => {
    console.log(req.body);

    var newBook = new Book(req.body);
    newBook.save((err) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error:' + err);
        } else {
            res.render('bookcreated', {book: newBook});
        }
    });
});


app.use('/searchBook', (req,res) => {
    console.log(req.body);
    if (req.body.wich == 'all'){
        searchAll(req, res);
    } else if (req.body.wich == 'any') {
        searchAny(req, res);
    } else {
        searchAll(req, res);
    }

});

app.use('/api', (req,res) => {
    
    var query = {};
    if (req.query.title) {
        query.title = {$regex: req.query.title};
    }

    if (req.query.year) {
        query.year = req.query.year;
    }

    if (req.query.name) {
        query['authors.name'] = {$regex: req.query.name};
    }
    console.log("this is de api ....... query");
    console.log(query);
    
    if (Object.keys(query).length != 0) {

        Book.find( query, (err, books) => {
            if (!err) {
                res.json(books);
            } else {
                console.log(err);
                res.json({});
            }
        })
    } else {
        res.json({});
    }
});


function searchAll(req, res) {
    var query = {};
    if (req.body.title) {
        query.title = req.body.title;}
    if (req.body.year) {
        query.year = req.body.year;}
    if (req.body.name) {
        query['authors.name'] = req.body.name;}
    console.log(query);
    Book.find( query, (err, books) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error:'+ err);
        } else {
            res.render('books', {books: books});
        }
    })
} // searchAll

function searchAny(req, res) {
    var terms = [];
    if (req.body.title)
        terms.push({title: { $regex: req.body.title } }); 

    if (req.body.year) 
        terms.push({year: req.body.year});

    if (req.body.name) 
        terms.push({'authors.name': req.body.name});

    console.log("terms array ......");
    console.log(terms);
    var query = { $or: terms}
    console.log("query ......");
    console.log(query);



    Book.find( query, (err, books) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error:'+ err);
        } else {
            res.render('books', {books: books});
        }
    }).sort({'title': 'asc'});
} // searchAll

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