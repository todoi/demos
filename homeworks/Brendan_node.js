#!/usr/bin/env node
var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 18888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看

  if (path ==='/'){
	  string=fs.readFileSync('./BrendanEich.html')
	  response.setHeader('Content-Type','text/html')
	  response.end(string)
  }if(path ==='/BrendanEich.css'){
	  cstring=fs.readFileSync('./BrendanEich.css')
	  response.setHeader('Content-Type','text/css')
	  response.end(cstring)
  }if(path ==='/Brendanscript.js'){
	  jstring=fs.readFileSync('./Brendanscript.js')
	  response.setHeader('Content-Type','application/javascript')
	  response.end(jstring)
  }
	else{
	  response.end('404')
  }

  // 代码结束，下面不要看
})

server.listen(port)
console.log('监听 18888 成功')
