const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());
// Setting ejs
app.set('views', 'src/views');  
app.set('view engine', 'ejs');
app.use(expressLayouts);
//Express Bodyparser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));
app.use(require('./routes'));

app.listen(5000);