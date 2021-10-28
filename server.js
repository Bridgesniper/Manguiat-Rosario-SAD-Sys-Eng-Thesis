// JavaScript source code
const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, './')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './komyut_search.html'));
});

app.get('/suggest', (request, response) => {
    response.sendFile(path.join(__dirname, './komyut_suggest.html'));
});

app.listen(port, () => {
    console.log(`Express server listening to port ${port}!`);
});
