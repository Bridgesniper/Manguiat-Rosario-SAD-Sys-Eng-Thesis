// JavaScript source code
const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './')));

app.get('/', (request, response) => {
    response.render('pages/komyut_search', { pageTitle: 'Search | Kompyut.ph'})
});

app.get('/suggest', (request, response) => {
    response.sendFile(path.join(__dirname, './komyut_suggest.html'));
});

app.get('/notfound', (request, response) => {
    response.sendFile(path.join(__dirname, './komyut_notfound.html'));
});

app.get('/request', (request, response) => {
    response.sendFile(path.join(__dirname, './komyut_ping.html'));
});

app.listen(port, () => {
    console.log(`Express server listening to port ${port}!`);
});
