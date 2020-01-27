var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs')

app.use('/public', express.static('static_files'));

app.use(bodyParser.urlencoded({extended: true}));




app.get('/', (req, res) => {
    res.render('welcome', {usernamemano: 'CandyLover', isAdmin:false});
});

app.listen(3000, () => {
    console.log("listen to port 3000");
})