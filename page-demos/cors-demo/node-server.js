let http = require('http')
let url = require('url')
let fs = require('fs')
let querystring = require('querystring')
let port = process.env.PORT || 8888

let server = http.createServer(function(request,response){
    let temp = url.parse(request.url)
    let path = temp.path
    let query = temp.query
    let method = request.method
    let string
    
    switch (path){
        case '/':
            string = fs.readFileSync('./index.html')
            response.statusCode = 200;
            response.setHeader('content-type','text/html,charset:utf-8')
            response.setHeader('Access-Control-Allow-Origin','http://michael.com:8888')
            response.end(string)
            break
        case '/style.css':
            string = fs.readFileSync('./style.css')
            response.writeHeader(200,{
                'content-type':'text/css',
                'Access-Control-Allow-Origin':'http://michael.com:8888',
                'Access-Control-Allow-Methods':'PUT,PATCH,HEAD,DELETE,OPTIONS,CONNECT,TRACE'
            })
            response.end(string)
            break
        default:
            response.writeHeader(404,{'content-type':'text/plain,charset:utf-8'})
            response.write('你要找的网页不存在')
            response.end()
    }
    console.log(method + ': ' + path)
})

server.listen(port)
console.log('正在监听：' + port)
