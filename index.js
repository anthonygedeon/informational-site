const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const query = url.parse('http://localhost:8081/index.html', true);
    const filename = `.${query.pathname}`;
    
    fs.readFile(filename, (error, data) => {

        if (error) {
            res.writeHead(404, {'Content-type': 'text/html'});
            return res.end('404 Not Found');
        }

        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        return res.end()
    })

}).listen(8081);