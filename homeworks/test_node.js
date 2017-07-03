#!/usr/bin/env node
var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 9888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看

  if (path ==='/'){
	  string=fs.readFileSync('./test.html')
	  response.setHeader('Content-Type','text/html')
	  response.end(string)
  }if(path ==='/test.css'){
	  cstring=fs.readFileSync('./test.css')
	  response.setHeader('Content-Type','text/css')
	  response.end(cstring)
  }if(path ==='/mytest.js'){
	  jstring=fs.readFileSync('./mytest.js')
	  response.setHeader('Content-Type','application/javascript')
	  response.end(jstring)
  }
	else{
	  response.end('404')
  }

  // 代码结束，下面不要看
})

server.listen(port)
console.log('监听 9888 成功')
