let http = require('http')
let fs = require('fs')
let url = require('url')
let querystring = require('querystring')
let port = process.env.PORT || 8888

let server = http.createServer(function(request,response){
    let temp = url.parse(request.url)
    let path = temp.pathname
    let query = temp.query
    let method = request.method
    let string

    switch (path){
        case '/':
            fs.readFile('./index.html',function(err,data){
                if(err){console.error(err)}
                response.writeHeader(200,{'content-type':'text/html,charset:utf-8'})
                response.end(data)
            })
            break
        case '/jsonp.js':
            string = fs.readFileSync('./jsonp.js','utf8')
            response.statusCode = 200
            response.setHeader('content-type','application/javascript')
            response.end(string.replace("{{data}}",query))
            break
        case '/info.js':
            let queryObject = parseQuery(query)
            string = fs.readFileSync('./info','utf8')
            response.statusCode = 200
            response.setHeader('content-type','text/plain')
            response.end(string.replace(/{{callback}}/g,queryObject['callback']))
            break
        default:
            response.statusCode = 404
            response.setHeader('content-type','text/html')
            response.end('你要找的网页不存在')
    }
    console.log(method + ': ' + path)
    function parseQuery(query){
        let arr = query.split('&&')
        let queryObject = {}
        arr.forEach(function(element){
            let elementArray = element.split('=')
            queryObject[elementArray[0]] = elementArray[1] 
        })
        return queryObject
    }
})

server.listen(port)
console.log('正在监听: ' + port)