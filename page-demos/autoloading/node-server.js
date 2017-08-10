#!/usr/bin/env node

let http = require('http')
let url = require('url')
let querystring = require('querystring')
let fs = require('fs')
let port = process.env.PORT || 8888

let server = http.createServer(function(request,response){
    let path = url.parse(request.url).pathname
    let query = querystring.parse(url.parse(request.url).query,'&','=')
    if (path === '/'){
        if (query['page'] === 'page1'){
            let string = fs.readFileSync('./page1')
            response.statusCode = 200
            response.setHeader('content-type','text/html,charset:utf-8')
            response.end(string)
        }else if(query.page === 'page2'){
            let string = fs.readFileSync('./page2')
            response.statusCode = 200
            response.setHeader('content-type','text/html,charset:utf-8')
            response.end(string)
        }else{
            let string = fs.readFileSync('./index.html')
            response.statusCode = 200
            response.setHeader('content-type','text/html;charset:utf-8')
            response.end(string)
        }
    }else{
        response.statusCode = 404
        response.setHeader('content-type','text/plain')
        response.end("the page you request not exist")
    }
    console.log(request.method + path)
})
console.log(`正在监听:${port}`)

server.listen(port)