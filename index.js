const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const query = url.parse('http://localhost:8080', true);
    let filename = `.${query.pathname}`;
    
    console.log(query.search)
    
    if (query.host === 'localhost:8080') {
        filename = `./index.html`;
    } else if (filename === './about') {
        filename = './about.html';
    } else if (filename === './contact-me') {
        filename = './contact-me.html';
    } else if (filename === './index') {
        filename = './index.html';
    } else {
        filename = '404.html';
    }
    
    fs.readFile(filename, (error, data) => {

        if (error) {
            res.writeHead(404, {'Content-type': 'text/html'});
            return res.end(data);
        }

        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        return res.end()
    })

}).listen(8080);