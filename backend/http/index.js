const http = require('http');
const url = require('url');

let main_body = [];  

const server = http.createServer((req, res) => {
  
    const parsedUrl = url.parse(req.url, true);

  
    const method = req.method;

     
    switch (method) {
        case 'GET':
      
            res.writeHead(200, { 'Content-Type': 'text/plain' });

            
            res.end(`GET request received with data: ${main_body.join('')}`);
            break;
        case 'POST':
          
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                
                main_body.push(body);

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`POST request received with data: ${body}`);
            });
            break;
        case 'PUT':
          
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('PUT request received.');
            break;
        case 'DELETE':
           
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('DELETE request received.');
            break;
        default:
            
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            break;
    }
});

const PORT = 3300;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
