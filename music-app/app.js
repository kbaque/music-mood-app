const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


app.get('/', (req, res) => {
  res.render('index', {
    message: '',
    currentPage: 'home',
    documentTitle: 'Music-mood',
  });
});


const musicRoutes = require('./routes/music-routes');
app.use('/musics', musicRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


// const musicSearchRoutes= require('./routes/search-routes');
// app.use('/musicSearch', musicSearchRoutes);

app.get('*', (req, res) => {
    res.status(404).send('not found!');
});
