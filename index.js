const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3000;
const HOST = 'localhost';

/**
 * Listens for GET request from <a>...</a> links
 * It directs to the correct page when a link is clicked
 * Example:
 * User clicks on about-me page, the function will be invoked via http.createServer and direct the user to the about-me page
 * @param {Object} request - Request related information
 * @param {Object} response - Response relation information
 */
const requestListener = (request, response) => { 
    const query = url.parse(request.url, true);
    const requestedURL = query.pathname === '/' ? './index' : `.${query.pathname}`;
    const filename = `${requestedURL}.html`;
    
    fs.readFile(filename, (error, data) => {

        if (error) {

            fs.readFile('404.html', (error, data) => {
                if (error) throw error;
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.write(data);
                return response.end();
            });
            
            return;
        } 

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    });
};

http
    .createServer(requestListener)
    .listen(PORT, HOST, 
    () => console.log(`Listening on PORT: ${PORT} at ${HOST}`));