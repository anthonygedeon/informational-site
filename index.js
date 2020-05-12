const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 8080;
const MIME_TEXT_HTML = { 'Content-Type': 'text/html' };

http.createServer((req, res) => {
	const query = url.parse(req.url, true);
	const filename = query.pathname === '/' ? './index.html' : `.${query.pathname}.html`;

	fs.readFile(filename, (error, data) => {
		if (error) {
			fs.readFile('./404.html', (error, data) => {
                if (error) {
                    res.writeHead(500, MIME_TEXT_HTML);
                    res.end('Internal error!');
                } else {
                    res.writeHead(404, MIME_TEXT_HTML);
                    res.end(data)
                }
            });
		} else {
			res.writeHead(200, MIME_TEXT_HTML);
			res.write(data);
			return res.end();
		}
	});
}).listen(PORT);
