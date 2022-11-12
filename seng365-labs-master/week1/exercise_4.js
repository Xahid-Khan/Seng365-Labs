const http = require('http');
const URL = require('url').URL;
const names = ['milk', 'bread', 'eggs', 'flour'];

http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const parameter = url.searchParams;
    let index = parseInt(parameter.get('itemNum'));

    response.writeHead(200, {'Content-Type':'text/plain'});

    response.end(`You selected item number ${index}: ${names[index]}`);

}).listen(8081);