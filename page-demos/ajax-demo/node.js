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

    if (method === 'GET'){
        if (path === '/'){
            let chunk = fs.readFileSync('./src/index.html')
            response.setHeader('content-type','text/html;charset:utf-8')
            response.end(chunk)
        }else if(path === '/style.css'){
            let chunk = fs.readFileSync('./src/style.css')
            response.setHeader('content-type','text/css')
            response.end(chunk)
        }else if(path === '/main.js'){
            let chunk = fs.readFileSync('./src/main.js')
            response.setHeader('content-type','application/javascript')
            response.end(chunk)
        }else{
            response.statusCode = 404
            response.setHeader('content-type','text/html;charset:utf-8')
            response.end('请求的网页不存在')
        }
    }else if(method === 'POST' ){
        if (path === '/login'){
            getRequestBody(request,function(result){
                let {username,password} = result
                let errors = {}
                if (username.trim() && password){
                    if(username === 'michael' && password === 'hi'){
                        response.statusCode = 200
                        response.setHeader('content-type','text/html;charset:utf-8')
                        response.end('hello ' + username)
                    }else if(username !== 'michael'){
                        response.statusCode = 404
                        errors['username'] = '用户名不存在'
                    }else if(username === 'michael' && password !== 'hi'){
                        response.statusCode = 412
                        errors['password'] = '密码错误'
                    }
                }else{
                    if (!username.trim()){
                        response.statusCode = 412
                        errors['username'] = '用户名不能为空'
                    }
                    if (!password){
                        response.statusCode = 412
                        errors['password'] = '密码不能为空'
                    }
                }
                if(Object.keys(errors).length > 0){
                    response.setHeader('content-type','text/html;charset:utf-8')
                    response.end(JSON.stringify({'errors':errors}))
                }
            })
        }else{
            repsonse.statusCode = 404
            response.setHeader('content-type','text/html;charset:utf-8')
            response.end('请求的资源不存在')
        }
    }

    console.log(method + ' ' + path)
})

server.listen(port)
console.log('监听' + port + '成功')

function getRequestBody(request,callback){
    let body = []
    request.on('error',(err)=>{
        console.error(err)
        }).on('data',(chunk)=>{
        body.push(chunk)
    }).on('end',()=>{
        body = Buffer.concat(body).toString()
        let result = querystring.parse(body,'&','=')
        callback.call(null,result)
    })
}