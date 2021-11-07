const express = require('express');

const router = express.Router();

module.exports = () => {

    router.get('/', (request, response) => {
        response.render('layout/komyut_search', { 
            pageTitle: 'Submission Success', 
            template: 'komyut_submitted' 
        });
    });

    return router;
}