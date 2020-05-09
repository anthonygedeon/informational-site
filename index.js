const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const query = url.parse(req.url, true);
    const filename = query.pathname === '/' ? './index.html' : `.${query.pathname}.html`;
    
    fs.readFile(filename, (error, data) => {

        if (error) {
            fs.readFile('404.html', (error, data) => {
                res.writeHead(404, {'Content-type': 'text/html'});
                res.write(data)
                return res.end();
            })
        }

        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        return res.end()
    })

}).listen(8080);