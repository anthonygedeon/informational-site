const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const HOST = 'localhost';

let root = '/public/'
let end = '.html';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${root}index${end}`))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, `${root}about${end}`))
});

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(__dirname, `${root}contact-me${end}`))
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, `${root}404${end}`))
});

app
    .listen(PORT, HOST, 
    () => console.log(`Listening on PORT: ${PORT} at ${HOST}`));