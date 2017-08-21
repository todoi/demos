#!/usr/bin/env node

let http = require('http')
let url = require('url')
let fs = require('fs')
let querystring = require('querystring')
let port = process.env.PORT || 8888

let server = http.createServer(function(request,response){
    let temp = url.parse(request.url)
    let path = temp.pathname
    let method = request.method
    let string

    switch (path){
        case '/':
            string = fs.readFileSync('./index.html','utf8')
            response.statusCode = 200
            response.setHeader('content-type','text/html,charset:utf-8')
            response.end(string)
            break
        case '/a':
            string = fs.readFileSync('./a','utf8')
            response.statusCode = 200
            response.setHeader('content-type','text/html,charset:utf-8')
            response.end(string)
            break
        case '/b':
            string = fs.readFileSync('./b','utf8')
            response.statusCode = 200
            response.setHeader('content-type','text/html,charset:utf-8')
            response.end(string)
            break
        default:
            response.statusCode = 404
            response.setHeader('content-type','text/plain,charset:utf-8')
            response.end('你要找的页面不存在')
    }

    console.log(method + ': ' + path)
})
server.listen(port)
console.log('正在监听：'+ port)
