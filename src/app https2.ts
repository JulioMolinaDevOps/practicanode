import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    /* res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>URL ${req.url}</h1>`);
    res.end();
 */
    /* const data ={name: "Fernando", age: 30, url: req.url};
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data)); */

    if (req.url === '/') {

        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile,);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    try {
        const response = fs.readFileSync(`./public${req.url}`);
        res.end(response);
        return;
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 - Not Found');
    }
});


process.env.PORT = '3040';
server.listen(process.env.PORT, () => {
    console.log(`Server running at https://localhost:${process.env.PORT}/`);
});





