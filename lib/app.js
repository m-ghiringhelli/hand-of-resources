const express = require('express');
const path = require('path');

const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/venues', require('./controllers/venues'));
app.use('/symphonies', require('./controllers/symphonies'));
app.use('/boroughs', require('./controllers/boroughs'));
app.use('/cheeses', require('./controllers/cheeses'));
app.use('/beatles', require('./controllers/beatles'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
