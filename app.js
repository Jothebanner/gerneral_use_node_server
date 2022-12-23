const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3002;

const options = {
    key: fs.readFileSync('../https/privkey.pem'),
    cert: fs.readFileSync('../https/cert.pem')
}

const server = https.createServer(options, (req, res) => {
    let filePath = req.url;
    if (filePath == '/')
        filePath = '/index.html';

    filePath = __dirname + filePath;
    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    fs.readFile(filePath, function (error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-type': contentType });
            res.end(content, 'utf-8');
        }
    })
});

server.listen(port, hostname, () => {
    console.log("Server started on port " + port);
});
