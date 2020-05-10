const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
	const query = url.parse(req.url, true);
	const filename = query.pathname === '/' ? './index.html' : `.${query.pathname}.html`;


	fs.readFile(filename, (error, data) => {
		if (error) {
			res.writeHead(404, { 'Content-type': 'text/html' });
			res.write(`<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404</title>
            </head>
            
            <body>
                <nav>
                    <a href="/"> Back to Home</a>
                </nav>
                <h1>404 - Sorry Not Found</h1>
            
            </body>

            </html>`);
			return res.end();
		}

		res.writeHead(200, { 'Content-type': 'text/html' });
		res.write(data);
		return res.end();
	});
}).listen(8080);
