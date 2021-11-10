require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employeeController');
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'))// Set the views directory
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout : 'mainlayout', layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');// Set hbs as default template

app.listen(8000, () => {
    console.log("Server is running");
})

app.use('/employee', employeeController);