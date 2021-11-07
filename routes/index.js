const express = require('express');

const suggestRoute = require('./suggest');
const submittedRoute = require('./submitted');

const router = express.Router();

module.exports = params => {

    router.get('/', (request, response) => {
        response.render('layout/komyut_search', { pageTitle: 'Search', template: 'komyut_search' });
    });

    router.use('/suggest', suggestRoute(params));
    router.use('/submitted', submittedRoute());

    return router;
}