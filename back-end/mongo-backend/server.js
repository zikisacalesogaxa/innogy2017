const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// Route files
const getPlumbers = require('./routes/getPlumbers');
const getPlumberById = require('./routes/getPlumberById');
const newPlumber = require('./routes/postPlumbers');
const hirePlumber = require('./routes/hirePlumber');
const getSchedules = require('./routes/getSchedules');

// Connection Config
const DBconnect = require('./config/connection');
DBconnect();

// use express middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());

// cors
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

// App Routes
app.get('/', (req, res) => {
    res.json({
        getAllPlumbers: "/api/v2/plumbers",
        createNewPlumber: "/api/v2/plumbers/register",
        getPlumberById: "/api/v2/plumbers/:_plumberId",
        hirePlumbers: "/api/v2/plumbers/book/:_plumberId",
        getSchedules: "/api/v2/plumbers/bookings/day/:_day/slot/:_slot"
    });
});
app.use('/api/v2/plumbers', getPlumbers);
app.use('/api/v2/plumbers', getPlumberById);
app.use('/api/v2/plumbers/register', newPlumber);
app.use('/api/v2/plumbers/book', hirePlumber);
app.use('/api/v2/plumbers/bookings', getSchedules);

// port config
const port = process.env.PORT || 9000;
app.listen(port, (err) => {
    (err) ? console.error(err) : console.log('listening on https://localhost:' + port);
});
