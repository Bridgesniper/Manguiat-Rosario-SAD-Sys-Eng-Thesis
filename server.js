// JavaScript source code
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require('body-parser');

const SuggestionService = require('./services/SuggestionService');

const suggestionService = new SuggestionService('./data/suggestions.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['groznyj', 'grad'],
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Komyut.ph';

app.use(express.static(path.join(__dirname, './')));

app.use(
    '/',
    routes({
        suggestionService,
    })
);

app.use((request, response, next) => next(createError(404, 'File not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, request, response, next) => {
    response.locals.message = err.message;
    // eslint-disable-next-line no-console
    console.error(err);
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express server listening to port ${port}!`);
});
