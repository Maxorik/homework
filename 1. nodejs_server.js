/** небольшой сервер на nodejs
 * старт: node '.\1. nodejs_server.js'
 * localhost:6969
 */

const http = require('http');
const fs = require('fs');

/** "бд" пользователей */
const users = ['petr', 'anna', 'cat'];


http.createServer(function(request, response) {
    if (request.method === 'GET' && request.url === '/') {
        fs.readFile('1. index.html', (err, data) => response.end(data))
    }

    /** общий GET метод получения всех пользователей */
    else if (request.method === 'GET' && request.url === '/users') {
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })

        const responseData = {
            users: users
        }
        response.end(JSON.stringify(responseData))
    }

    /** GET на проверку наличия конкретного user */
    else if (request.method === 'GET' && request.url.startsWith('/users/')) {
        const username = request.url.split('/')[2];
        const result = users.includes(username.toLowerCase());

        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })

        const responseData = {
            result: result
        }
        response.end(JSON.stringify(responseData))
    }

    else {
        response.end('error page')
    }
}).listen(6969, '127.0.0.1', function() {
    console.log('server started at port 6969')
})