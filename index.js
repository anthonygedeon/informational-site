const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3000;

http.createServer((req, res) => {

    let htmlPath = '';
    
    const query = url.parse(req.url, true);

    switch(query.path) {

        case '/':
            htmlPath += 'index.html';
            break;

        case '/contact-me':
            htmlPath += 'contact-me.html';
            break;
        
        case '/about':
            htmlPath += 'about.html';
            break;

        default:
            htmlPath += '404.html';
            break;

    }

    fs.readFile(htmlPath, (error, data) => {

        console.log(htmlPath)

        if (error) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end(data);
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end(data);

    });


}).listen(PORT);