#!usr/bin/env node

let http = require('http')
let url = require('url')
let querystring = require('querystring')
let fs = require('fs')

let port = process.env.PORT || 8888

let server = http.createServer(function(request,response){
    let temp = url.parse(request.url)
    let {path,query} = temp
    let method = request.method

    if (path === '/'){
        fs.readFile('./index.html',function(error,data){
            response.writeHeader(200,{
                'content-type':'text/html,charset:utf-8',
                'Access-Control-Allow-Origin': 'http://lily.com',
                'Cache-Control': 'public,max-age:3600'
            })
            response.write(data)
            response.end()
        })
    }else if(path === '/style.css'){
        let string = fs.readFileSync('./style.css')
        response.writeHeader(200,{
            'content-type': 'text/css',
            'Cache-Control': 'public,max-age:3600'
        })
        response.write(string)
        response.end()
    }else if(path === '/page1'){
        let string = fs.readFileSync('./page1','utf8')
        response.statusCode = 200
        response.setHeader('content-type','application/json')
        response.end(string)
    }else if(path === '/page2'){
        let string = fs.readFileSync('./page2','utf8')
        response.statusCode = 200
        response.setHeader('content-type','application/json')
        response.end(string)
    }else if(path === '/images/Spinner.gif'){
        let string = fs.readFileSync('./images/Spinner.gif')
        response.statusCode = 200
        response.setHeader('content-type','image/gif')
        response.end(string)
    }
    else {
        response.statusCode = 404
        response.setHeader('content-type','text/html,charset:utf-8')
        response.end('你要找到页面不存在')
    }

    console.log(method + ': ' + path)
})

server.listen(port)
console.log('正在监听：'+port)